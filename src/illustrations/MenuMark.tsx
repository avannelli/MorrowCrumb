/**
 * The counter menu itself: two stacked cards — yesterday's list behind, today's
 * in front — with a croissant crest, a short ruled list and a caramel line for
 * the thing that has already gone. Drawn in the same thin-line style as the
 * pastry art so it sits above the section title without shouting.
 */
export function MenuMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 116"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {/* yesterday's card, still on the pile */}
      <path
        d="M14 14 H70 V108 H14 Z"
        transform="rotate(-7 42 61)"
        fill="var(--cream-deep)"
        stroke="var(--rule-strong)"
        strokeWidth="1.2"
      />

      {/* today's card */}
      <path
        d="M22 8 H82 V108 H22 Z"
        fill="var(--warm-white)"
        stroke="var(--charcoal)"
        strokeWidth="1.5"
      />
      <path
        d="M27 13 H77 V103 H27 Z"
        fill="none"
        stroke="var(--rule-strong)"
        strokeWidth="0.8"
      />

      {/* croissant crest */}
      <g transform="translate(52 32)">
        <path
          d="M-14 7 C-16 -1 -12 -9 -4 -12 C4 -15 13 -12 17 -7 C21 -2 21 4 18 7
             C16 9 13 8 12 5 C10 0 5 -3 -1 -3 C-8 -3 -12 0 -13 5 C-14 8 -13 9 -14 7 Z"
          fill="var(--crust)"
        />
        <path
          d="M-12 3 C-13 -4 -8 -9 -1 -11 C4 -12 8 -12 11 -11 C4 -10 -2 -8 -6 -4
             C-9 -1 -11 1 -12 3 Z"
          fill="var(--crust-light)"
        />
        <g
          fill="none"
          stroke="var(--crust-dark)"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.55"
        >
          <path d="M-8 -7 L-7 -1" />
          <path d="M0 -12 L0 -3" />
          <path d="M8 -11 L7 -3" />
        </g>
      </g>

      {/* rule under the crest */}
      <path d="M34 48 H70" stroke="var(--caramel)" strokeWidth="1.2" strokeLinecap="round" />

      {/* the day's short list */}
      <g
        stroke="var(--rule-strong)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M34 60 H70" />
        <path d="M34 69 H62" />
        <path d="M34 78 H70" />
        <path d="M34 87 H58" />
      </g>

      {/* and the one that has already gone */}
      <path
        d="M34 96 H46"
        stroke="var(--caramel)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
