const MEASUREMENT_ID = 'G-KBYW046E26';
const PRODUCTION_HOSTS = ['lacoloradacocina.com.ar', 'www.lacoloradacocina.com.ar'];
type AnalyticsWindow = Window & { dataLayer?: unknown[][] };

/** Production only. Do not pass link URLs, order text or customer details. */
export function initializeAnalytics() {
  if (!import.meta.env.PROD || !PRODUCTION_HOSTS.includes(window.location.hostname)) return;
  if (document.getElementById('colorada-google-tag')) return;

  const analyticsWindow = window as AnalyticsWindow;
  const queue = analyticsWindow.dataLayer ??= [];
  // gtag consumes argument objects, rather than arrays.
  // Google tag requires an Arguments object in dataLayer.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    queue.push(arguments as unknown as unknown[]);
  }
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    page_location: window.location.origin + window.location.pathname,
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
