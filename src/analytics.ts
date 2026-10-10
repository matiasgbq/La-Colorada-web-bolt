const MEASUREMENT_ID = 'G-KBYW046E26';
const PRODUCTION_HOSTS = ['lacoloradacocina.com.ar', 'www.lacoloradacocina.com.ar'];
type AnalyticsWindow = Window & { dataLayer?: unknown[][] };

/** Production only. Do not pass link URLs, order text or customer details. */
export function initializeAnalytics() {
  if (!import.meta.env.PROD || !PRODUCTION_HOSTS.includes(window.location.hostname)) return;
  if (document.getElementById('colorada-google-tag')) return;

  const analyticsWindow = window as AnalyticsWindow;
  const queue = analyticsWindow.dataLayer ??= [];
  // Google tag requires an Arguments object in dataLayer.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    queue.push(arguments as unknown as unknown[]);
  }
  gtag('js', new Date());
  const campaign: Record<string, string> = {};
  const query = new URLSearchParams(window.location.search);
  for (const [utm, field] of [
    ['utm_source', 'campaign_source'],
    ['utm_medium', 'campaign_medium'],
    ['utm_campaign', 'campaign_name'],
  ]) {
    const value = query.get(utm);
    // Campaign labels only: reject free text, emails and full URLs.
    if (value && /^[a-z0-9_-]{1,80}$/i.test(value)) campaign[field] = value;
  }
  let referrer = '';
  try {
    referrer = document.referrer ? new URL(document.referrer).origin : '';
  } catch { /* Ignore malformed referrers. */ }
  gtag('config', MEASUREMENT_ID, {
    page_location: window.location.origin + window.location.pathname,
    page_referrer: referrer,
    ...campaign,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[data-contact-event]');
    if (!link) return;
    const name = link.dataset.contactEvent;
    const position = link.dataset.contactPosition;
    if (!['whatsapp_click', 'phone_click', 'directions_click'].includes(name ?? '')) return;
    if (!['hero', 'location', 'order_modal'].includes(position ?? '')) return;
    gtag('event', name, { contact_position: position, transport_type: 'beacon' });
  }, { capture: true });

  const script = document.createElement('script');
  script.id = 'colorada-google-tag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}
