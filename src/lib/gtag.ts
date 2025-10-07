export function loadGtag(id: string | undefined) {
  if (!id || typeof window === 'undefined') return;

  // avoid double-insert
  if (document.querySelector(`script[data-gtag="${id}"]`)) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s.setAttribute('data-gtag', id);
  document.head.appendChild(s);

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function gtag() { (window as any).dataLayer.push(arguments); };

  (window as any).gtag('js', new Date());
  (window as any).gtag('config', id, { send_page_view: false });
}

export function sendPageView() {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag !== 'function') return;
  (window as any).gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}
