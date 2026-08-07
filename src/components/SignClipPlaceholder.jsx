import ConceptIcon from '@/components/icons/ConceptIcon.jsx'

/**
 * The space a signed clip will occupy, before it has been filmed.
 *
 * It is drawn to look like the clip rather than like a hole. The real video
 * sits on `stage-deep` behind a solid `brand-200` border, because guidance on
 * sign-language video asks for a solid dark ground behind the signer - so this
 * uses the same ground and the same border, and the page does not change shape
 * when the file finally lands.
 *
 * What it replaced: a dashed outline on a pale tint with a generic icon in it.
 * A dashed border is the universal "this is broken" signal, and there are
 * forty of these down the dictionary - repeated that many times it made a site
 * with real content look like an empty template. Nothing about the gap is
 * hidden by the change; the label still says the clip is not filmed, and the
 * Teachers page still prints the exact count.
 *
 * The hands are from the site's own picture set, not an icon font. Those
 * drawings are the most distinctive thing here and this is the place they get
 * seen most.
 */
export default function SignClipPlaceholder({ label, className = '' }) {
  return (
    <div
      className={`flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-brand-200 bg-stage-deep p-4 text-center ${className}`}
    >
      <ConceptIcon name="hands" className="h-16 w-16 text-stage-muted" />
      {/* Quiet on purpose. Said forty times down a page, a loud "COMING SOON"
          reads as forty failures; small and tracked, it reads as a caption. */}
      <p className="text-[0.7rem] font-bold uppercase leading-snug tracking-[0.14em] text-stage-muted">
        {label}
      </p>
    </div>
  )
}
