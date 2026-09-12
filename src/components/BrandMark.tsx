type BrandMarkProps = {
  /** Rendered height in px (or any CSS length). Width follows the artwork ratio. */
  height?: number | string;
  className?: string;
  /** Supply only when the mark is not accompanied by the name in text. */
  title?: string;
};

/**
 * Morrow & Crumb primary mark: a croissant resting in an open hand.
 *
 * The hand is reduced to the cradle it makes — a cupped palm seen edge-on,
 * thickest under the pastry, tapering to the wrist at one end and to the
 * fingertips at the other — so the croissant stays the subject and the
 * silhouette still reads at 28px in the header.
 */
export function BrandMark({ height = 40, className, title }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 132"
      height={height}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {/* the hand, reduced to the cradle it makes */}
      <path
        d="M25 96
           C20 104 24 114 35 120
           C57 131 85 134 109 132
           C136 130 161 121 175 107
           C184 99 183 88 177 86
           C172 97 160 105 146 111
           C121 121 91 122 67 116
           C47 111 34 104 31 96
           C30 92 27 92 25 96 Z"
        fill="var(--skin)"
      />

      {/* the underside, out of the light */}
      <path
        d="M25 108
           C27 115 30 119 35 122
           C57 133 85 136 109 134
           C135 132 159 124 173 112
           C177 108 180 103 180 99
           C178 106 171 113 160 119
           C138 130 108 134 84 132
           C60 130 40 124 31 116
           C27 113 25 111 25 108 Z"
        fill="var(--skin-shade)"
        opacity="0.85"
      />

      {/* fingers held together, seen edge-on */}
      <g
        fill="none"
        stroke="var(--skin-line)"
        strokeLinecap="round"
        strokeWidth="2.4"
        opacity="0.3"
      >
        <path d="M141 116 C154 112 165 106 173 99" />
        <path d="M129 120 C143 116 155 110 164 103" />
        <path d="M116 122 C130 119 142 114 151 108" />
      </g>

      {/* the crease of the palm */}
      <path
        d="M40 110 C52 118 68 123 88 125"
        fill="none"
        stroke="var(--skin-line)"
        strokeLinecap="round"
        strokeWidth="2.4"
        opacity="0.2"
      />

      {/* the pastry settles into the cup of the palm */}
      <ellipse cx="100" cy="107" rx="40" ry="3.5" fill="var(--skin-line)" opacity="0.16" />

      {/* croissant */}
      <g transform="translate(22 6) scale(1.14)">
        <path
          d="M18 82
             C21 50 42 30 70 30
             C98 30 119 50 122 82
             C116 87 107 85 104 76
             C98 70 86 66 70 66
             C54 66 42 70 36 76
             C33 85 24 87 18 82 Z"
          fill="var(--crust)"
        />
        {/* glaze along the top of the bake */}
        <path
          d="M26 70
             C33 48 50 34 70 33
             C83 32 94 35 103 41
             C89 36 74 38 61 44
             C46 51 33 60 26 70 Z"
          fill="var(--crust-light)"
        />
        {/* lamination seams */}
        <g
          fill="none"
          stroke="var(--crust-dark)"
          strokeLinecap="round"
          strokeWidth="2.6"
          opacity="0.55"
        >
          <path d="M42 48 C46 56 48 63 48 70" />
          <path d="M70 33 C70 43 70 51 70 58" />
          <path d="M98 48 C94 56 92 63 92 70" />
        </g>
        {/* the underside, in shadow against the palm */}
        <path
          d="M36 76 C42 70 54 66 70 66 C86 66 98 70 104 76
             C95 72 83 70 70 70 C57 70 45 72 36 76 Z"
          fill="var(--crust-dark)"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}
