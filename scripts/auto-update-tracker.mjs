// auto-update-tracker.mjs
// Sistema automático de seguimiento y actualización de cambios en la página

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const trackedFiles = [
  "public/robots.txt",
  "public/llms.txt",
  "src/components/**/*.tsx",
  "src/pages/**/*.tsx",
  "src/lib/**/*.ts",
  "package.json",
  "vite.config.ts",
];

const updateLogPath = path.join(workspaceRoot, "update-log.json");

function loadUpdateLog() {
  try {
    const data = fs.readFileSync(updateLogPath, "utf8");
    return JSON.parse(data);
  } catch {
    return { lastUpdate: null, changes: [] };
  }
}

function saveUpdateLog(log) {
  fs.writeFileSync(updateLogPath, JSON.stringify(log, null, 2));
}

function detectChanges() {
  const log = loadUpdateLog();
  const now = new Date().toISOString();
  const changes = [];

  // Verificar cambios en archivos críticos
  const criticalFiles = ["public/robots.txt", "public/llms.txt"];
  
  for (const file of criticalFiles) {
    const filePath = path.join(workspaceRoot, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const lastModified = stats.mtime.toISOString();
      
      if (!log.lastUpdate || new Date(lastModified) > new Date(log.lastUpdate)) {
        changes.push({
          file,
          type: "content_update",
          timestamp: now,
          reason: "Actualización manual detectada",
        });
      }
    }
  }

  // Verificar cambios en package.json (dependencias)
  const packageJsonPath = path.join(workspaceRoot, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const depsChanged = packageJson.dependencies || packageJson.devDependencies;
    
    if (depsChanged && (!log.lastDeps || JSON.stringify(depsChanged) !== log.lastDeps)) {
      changes.push({
        file: "package.json",
        type: "dependency_update",
        timestamp: now,
        reason: "Cambio en dependencias detectado",
        details: depsChanged,
      });
    }
  }

  return changes;
}

function generateUpdateSummary(changes) {
  const summary = {
    timestamp: new Date().toISOString(),
    totalChanges: changes.length,
    changeTypes: {},
    affectedFiles: [],
    recommendations: [],
  };

  for (const change of changes) {
    summary.changeTypes[change.type] = (summary.changeTypes[change.type] || 0) + 1;
    summary.affectedFiles.push(change.file);
  }

  // Generar recomendaciones
  if (changes.some((c) => c.type === "dependency_update")) {
    summary.recommendations.push(
      "Ejecutar 'npm install' para actualizar dependencias",
    );
  }

  if (changes.some((c) => c.type === "content_update")) {
    summary.recommendations.push(
      "Verificar que robots.txt y llms.txt estén actualizados",
    );
  }

  if (changes.length === 0) {
    summary.recommendations.push(
      "No hay cambios pendientes - todo al día",
    );
  }

  return summary;
}

function logChanges(changes) {
  const log = loadUpdateLog();
  
  for (const change of changes) {
    log.changes.push({
      ...change,
      id: Math.random().toString(36).substr(2, 9),
    });
  }

  log.lastUpdate = new Date().toISOString();
  saveUpdateLog(log);

  console.log("📋 Resumen de Actualizaciones Detectadas:");
  console.log(`   Total de cambios: ${changes.length}`);
  console.log("   Tipos de cambios:");
  
  for (const [type, count] of Object.entries(log.changeTypes || {})) {
    console.log(`     - ${type}: ${count}`);
  }

  console.log("\n📁 Archivos afectados:");
  for (const file of log.affectedFiles || []) {
    console.log(`   - ${file}`);
  }

  console.log("\n💡 Recomendaciones:");
  for (const rec of log.recommendations || []) {
    console.log(`   • ${rec}`);
  }
}

function main() {
  console.log("🔍 Iniciando seguimiento automático de cambios...\n");

  const changes = detectChanges();

  if (changes.length > 0) {
    logChanges(changes);
    console.log("\n✅ Seguimiento completado - cambios registrados.");
  } else {
    console.log("✅ No hay cambios pendientes - todo al día.");
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.cwd()}/scripts/auto-update-tracker.mjs`) {
  main();
}

export { main, detectChanges, logChanges };