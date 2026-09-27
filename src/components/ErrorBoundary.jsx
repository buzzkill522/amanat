import { Component } from 'react'

/**
 * Catches a render crash so one bad lesson cannot take down the whole site.
 *
 * Without this, a single malformed entry in content/modules/ white-screens
 * everything - no header, no nav, no way back. That happened twice while this
 * site was being built, and an educator editing a JSON file by hand is exactly
 * who it will happen to next.
 *
 * Two deliberate choices:
 *
 *   1. The message is hard-coded in both languages rather than translated
 *      through the usual `t()`. If the thing that broke *is* the language
 *      layer, a fallback that depends on the language layer breaks with it.
 *      Static text always renders.
 *   2. It says what to do, not what went wrong. "Something went wrong on this
 *      page" is no use to a child; "go back to the start" is.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    // No analytics on this site by design, so the console is the only place
    // this can go. It is enough for whoever is editing the content.
    console.error('Amanat: a page failed to render.', error, info?.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="mx-auto max-w-lg space-y-6 px-4 py-16 text-center">
        <p aria-hidden="true" className="font-display text-6xl">
          ⚠️
        </p>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-ink">This page did not open</h1>
          <p className="text-lg text-muted">
            Try reloading this page. If you are offline, reconnect and try again. Reloading keeps completed lessons saved on this device.
          </p>
        </div>

        <div lang="hi" className="space-y-2 border-t border-brand-100 pt-6">
          <p className="text-2xl font-extrabold text-ink">यह पन्ना नहीं खुला</p>
          <p className="text-lg text-muted">
            पेज दोबारा खोलें। ऑफ़लाइन हैं तो इंटरनेट से जुड़कर कोशिश करें। दोबारा खोलने पर इस डिवाइस पर सहेजे हुए पूरे पाठ बने रहते हैं।
          </p>
        </div>

        {/* A full page load, not a router link: whatever broke is still in
            memory, and only a reload is guaranteed to clear it. */}
        <p>
          <button className="btn-secondary mb-4" onClick={() => window.location.reload()}>Reload this page · पेज दोबारा खोलें</button>
          <a href="/" className="btn-primary">
            Go to the start · शुरुआत पर जाइए
          </a>
        </p>
      </div>
    )
  }
}
