// Public integration endpoints (visible in rendered HTML by nature — not secrets).
// Environment variables of the same purpose override these at build time.
export const SITE_CONFIG = {
  /** Cal.com event link embedded on /thanks */
  bookingUrl: 'https://cal.com/ali-nisar-mv/30min',
  /** Formspree endpoint the /contact form POSTs to */
  formEndpoint: 'https://formspree.io/f/xbdnybdp',
};
