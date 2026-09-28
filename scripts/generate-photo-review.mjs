import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative, sep } from 'node:path';

const root = 'repo-fotos/platos';
const outputDirectory = 'repo-fotos/revision';
const candidateDirectory = join(outputDirectory, 'candidates');
const manualReviewPath = join(outputDirectory, 'manual-review.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png']);
const manualReview = existsSync(manualReviewPath)
  ? JSON.parse(readFileSync(manualReviewPath, 'utf8'))
  : {};

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function pngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), format: 'PNG' };
}

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
        format: 'JPEG',
      };
    }
    if (offset + 4 >= buffer.length) break;
    const length = buffer.readUInt16BE(offset + 2);
    if (length < 2) break;
    offset += 2 + length;
  }
  return null;
}

function titleFromFilename(filePath) {
  return basename(filePath, extname(filePath))
    .replace(/^\d+[a-z]?-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function htmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const files = walk(root)
  .filter((filePath) => imageExtensions.has(extname(filePath).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, 'es'));

const hashCounts = new Map();
const records = files.map((filePath) => {
  const buffer = readFileSync(filePath);
  const hash = createHash('sha256').update(buffer).digest('hex');
  hashCounts.set(hash, (hashCounts.get(hash) ?? 0) + 1);
  const dimensions = pngDimensions(buffer) ?? jpegDimensions(buffer);
  const relativePath = relative(root, filePath).split(sep).join('/');
  const segments = relativePath.split('/');
  const category = segments.length === 1 ? 'empanadas' : segments[0];

  return {
    path: relativePath,
    category,
    name: titleFromFilename(filePath),
    bytes: statSync(filePath).size,
    hash,
    validImage: Boolean(dimensions),
    ...dimensions,
  };
});

const candidateFiles = existsSync(candidateDirectory)
  ? walk(candidateDirectory)
      .filter((filePath) => extname(filePath).toLowerCase() === '.png')
      .sort((a, b) => a.localeCompare(b, 'es'))
  : [];

const knownCandidatePaths = new Set(records.map((record) => {
  const candidateFilename = record.path.replace(/\.[^.]+$/, '.png');
  return record.category === 'empanadas'
    ? join('empanadas', candidateFilename)
    : candidateFilename;
}));

for (const candidateFilePath of candidateFiles) {
  const candidateRelativePath = relative(candidateDirectory, candidateFilePath).split(sep).join('/');
  if (knownCandidatePaths.has(candidateRelativePath)) continue;

  const buffer = readFileSync(candidateFilePath);
  const dimensions = pngDimensions(buffer);
  const [category] = candidateRelativePath.split('/');
  const manualNote = manualReview[`candidates/${candidateRelativePath}`];

  records.push({
    path: `candidates/${candidateRelativePath}`,
    source: null,
    category,
    name: titleFromFilename(candidateFilePath),
    bytes: statSync(candidateFilePath).size,
    hash: createHash('sha256').update(buffer).digest('hex'),
    validImage: Boolean(dimensions),
    duplicateCount: 1,
    candidate: `./candidates/${candidateRelativePath}`,
    status: manualNote?.status ?? 'Candidata',
    reason: manualNote?.reason ?? 'Candidata asistida basada en fotos reales y el patrón aprobado; requiere aprobación humana antes de publicarse.',
    ...dimensions,
  });
}

for (const record of records) {
  if (record.source === null) continue;

  const candidateFilename = record.path.replace(/\.[^.]+$/, '.png');
  const candidateRelativePath = record.category === 'empanadas'
    ? join('empanadas', candidateFilename)
    : candidateFilename;
  const candidateFilePath = join(candidateDirectory, candidateRelativePath);
  const manualNote = manualReview[record.path];

  record.duplicateCount = hashCounts.get(record.hash);
  record.candidate = existsSync(candidateFilePath)
    ? `./candidates/${candidateRelativePath}`
    : null;
  record.status = manualNote?.status ?? (record.candidate
    ? 'Candidata'
    : !record.validImage
    ? 'Sin foto'
    : record.duplicateCount > 1
      ? 'Dudosa'
      : 'Necesita edición');
  record.reason = manualNote?.reason ?? (record.candidate
    ? 'Muestra estandarizada en laboratorio; requiere aprobación humana antes de publicarse.'
    : !record.validImage
    ? 'El archivo contiene JSON y no una imagen.'
    : record.duplicateCount > 1
      ? `La misma imagen aparece ${record.duplicateCount} veces.`
      : 'Original válido; falta aprobar encuadre y generar WebP.');
}

const counts = records.reduce((result, record) => {
  result[record.status] = (result[record.status] ?? 0) + 1;
  return result;
}, {});

const cards = records
  .map((record) => {
    const source = record.source === null ? null : `../platos/${record.path}`;
    const media = record.source === null
      ? `<div class="previews candidate-only">
          <figure class="candidate"><img src="${htmlEscape(record.candidate)}" alt="Candidata estandarizada de ${htmlEscape(record.name)}"><figcaption>Candidata de laboratorio</figcaption></figure>
        </div>`
      : record.validImage
      ? `<div class="previews${record.candidate ? ' has-candidate' : ''}">
          <figure><img src="${htmlEscape(source)}" alt="${htmlEscape(record.name)}"><figcaption>Original</figcaption></figure>
          <figure class="crop"><img src="${htmlEscape(source)}" alt="Recorte web de ${htmlEscape(record.name)}"><figcaption>Recorte de tarjeta</figcaption></figure>
          ${record.candidate ? `<figure class="candidate"><img src="${htmlEscape(record.candidate)}" alt="Candidata estandarizada de ${htmlEscape(record.name)}"><figcaption>Candidata de laboratorio</figcaption></figure>` : ''}
        </div>`
      : `<div class="missing" aria-label="Sin foto"><span>🍽️</span><strong>Sin foto válida</strong><small>Se usará placeholder</small></div>`;

    return `<article class="card" data-category="${htmlEscape(record.category)}" data-status="${htmlEscape(record.status)}">
      ${media}
      <div class="content">
        <span class="status status-${record.status.toLowerCase().replaceAll(' ', '-')}">${record.status}</span>
        <h2>${htmlEscape(record.name)}</h2>
        <p class="path">${htmlEscape(record.path)}</p>
        <dl>
          <div><dt>Tipo</dt><dd>${record.format ?? 'JSON inválido'}</dd></div>
          <div><dt>Dimensiones</dt><dd>${record.width ? `${record.width} × ${record.height} px` : '—'}</dd></div>
          <div><dt>Peso</dt><dd>${Math.round(record.bytes / 1024)} KB</dd></div>
        </dl>
        <p class="reason">${htmlEscape(record.reason)}</p>
      </div>
    </article>`;
  })
  .join('\n');

const categories = [...new Set(records.map((record) => record.category))];
const filterButtons = ['todas', ...categories]
  .map((category) => `<button data-filter="${category}">${category.replaceAll('-', ' ')}</button>`)
  .join('');

const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Revisión de fotos · La Colorada</title>
  <style>
    :root { color-scheme: light; font-family: Inter, system-ui, sans-serif; color: #251b18; background: #f6f0e8; }
    * { box-sizing: border-box; }
    body { margin: 0; }
    header { padding: 42px clamp(20px, 5vw, 72px) 28px; background: #a91616; color: white; }
    header h1 { margin: 0 0 10px; font-size: clamp(30px, 5vw, 56px); }
    header p { max-width: 820px; margin: 0; line-height: 1.55; color: #ffe9df; }
    .summary { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
    .summary span { padding: 8px 12px; border-radius: 999px; background: #ffffff18; border: 1px solid #ffffff38; }
    .toolbar { position: sticky; top: 0; z-index: 3; display: flex; gap: 8px; overflow-x: auto; padding: 14px clamp(20px, 5vw, 72px); background: #fffdf9ee; backdrop-filter: blur(10px); border-bottom: 1px solid #ded3c8; }
    button { border: 1px solid #d6c8bb; border-radius: 999px; padding: 8px 13px; background: white; color: #5d4037; cursor: pointer; text-transform: capitalize; white-space: nowrap; }
    button.active { background: #a91616; color: white; border-color: #a91616; }
    main { display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 22px; padding: 30px clamp(20px, 5vw, 72px) 70px; }
    .card { overflow: hidden; border-radius: 18px; background: white; border: 1px solid #e3d8ce; box-shadow: 0 10px 30px #542b1612; }
    .previews { display: grid; grid-template-columns: 1fr 1fr; height: 190px; background: #ede3d8; }
    .previews.has-candidate { grid-template-columns: 1fr 1fr; height: auto; }
    .previews.candidate-only { display: block; height: auto; }
    figure { position: relative; margin: 0; overflow: hidden; }
    .previews.has-candidate > figure:not(.candidate) { height: 190px; }
    figure img { width: 100%; height: 100%; object-fit: contain; }
    figure.crop img { object-fit: cover; }
    figure.candidate { grid-column: 1 / -1; aspect-ratio: 4 / 3; border-top: 1px solid #e3d8ce; }
    figure.candidate img { object-fit: contain; background: #f6f0e8; }
    figcaption { position: absolute; left: 8px; bottom: 8px; padding: 4px 7px; border-radius: 999px; color: white; background: #231815bb; font-size: 11px; }
    .missing { height: 190px; display: grid; place-content: center; justify-items: center; gap: 5px; background: #fff8ed; color: #a91616; }
    .missing span { font-size: 46px; }
    .missing small { color: #7a6257; }
    .content { padding: 18px; }
    .status { display: inline-block; padding: 5px 9px; border-radius: 999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
    .status-sin-foto { color: #8b1d1d; background: #ffe0dc; }
    .status-dudosa { color: #715300; background: #fff0b8; }
    .status-necesita-edición { color: #214d65; background: #dff3ff; }
    .status-candidata { color: #24532a; background: #dff4df; }
    .status-aprobada { color: #174c2a; background: #ccefd7; }
    h2 { margin: 12px 0 5px; font-size: 20px; }
    .path { margin: 0 0 14px; color: #7c6a61; font: 12px ui-monospace, monospace; overflow-wrap: anywhere; }
    dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 0; }
    dl div { padding: 8px; border-radius: 9px; background: #f8f3ed; }
    dt { color: #8a7469; font-size: 10px; text-transform: uppercase; }
    dd { margin: 3px 0 0; font-size: 12px; font-weight: 700; }
    .reason { margin: 14px 0 0; color: #5d4c44; font-size: 13px; line-height: 1.45; }
    .hidden { display: none; }
  </style>
</head>
<body>
  <header>
    <h1>Revisión de fotos</h1>
    <p>Laboratorio visual: compara originales, recortes y candidatas estandarizadas. Nada de esta carpeta pasa al menú público sin aprobación humana; la web utiliza copias aprobadas y optimizadas desde public/images/menu/.</p>
    <div class="summary">
      <span>${records.length} archivos</span>
      <span>${records.filter((record) => record.validImage).length} imágenes válidas</span>
      <span>${counts['Sin foto'] ?? 0} faltantes</span>
      <span>${counts.Dudosa ?? 0} duplicadas o dudosas</span>
    </div>
  </header>
  <nav class="toolbar">${filterButtons}</nav>
  <main>${cards}</main>
  <script>
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const cards = [...document.querySelectorAll('.card')];
    buttons[0].classList.add('active');
    buttons.forEach((button) => button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      cards.forEach((card) => card.classList.toggle('hidden', button.dataset.filter !== 'todas' && card.dataset.category !== button.dataset.filter));
    }));
  </script>
</body>
</html>`;

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, 'inventario.json'), `${JSON.stringify(records, null, 2)}\n`);
writeFileSync(join(outputDirectory, 'index.html'), `${html.replace(/[ \t]+$/gm, '')}\n`);

console.log(`Galería generada: ${join(outputDirectory, 'index.html')}`);
console.log(`${records.length} archivos: ${records.filter((record) => record.validImage).length} imágenes válidas y ${counts['Sin foto'] ?? 0} faltantes.`);
