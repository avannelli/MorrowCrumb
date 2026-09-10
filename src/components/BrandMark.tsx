type BrandMarkProps = {
  /** Rendered height in px (or any CSS length). Width follows the artwork ratio. */
  height?: number | string;
  className?: string;
  /** Supply only when the mark is not accompanied by the name in text. */
  title?: string;
};

/**
 * Morrow & Crumb primary mark: an open hand, palm up, holding a croissant.
 *
 * Read from the side: the wrist enters low on the left, the palm opens into
 * fingers held together — separated by the thin lines that show when a hand is
 * seen edge-on — and the croissant rests across the open palm. The pastry is
 * one plump crescent with lamination seams and a glazed upper edge, so the
 * whole mark stays legible at 34px in the header and at full size during the
 * intro.
 */
export function BrandMark({ height = 40, className, title }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="30 28 222 168"
      height={height}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {/* hand: wrist, palm and fingers as one silhouette */}
      <path
        d="M44 196 C40 168 44 141 58 124 C71 110 98 105 130 107
           C160 109 192 107 214 101 C228 97 240 101 240 110
           C240 121 231 130 216 135 C192 143 160 150 130 152
           C101 154 82 161 74 196 Z"
        fill="var(--skin)"
      />
      {/* underside of the hand, out of the light */}
      <path
        d="M74 196 C82 161 101 154 130 152 C160 150 192 143 216 135
           C226 132 234 127 238 120 C236 132 227 141 213 147
           C190 156 158 163 129 165 C104 167 88 174 82 196 Z"
        fill="var(--skin-shade)"
      />
      {/* fingers held together, seen edge-on */}
      <g
        fill="none"
        stroke="var(--skin-line)"
        strokeLinecap="round"
        strokeWidth="1.8"
        opacity="0.32"
      >
        <path d="M150 124 C176 122 202 117 224 110" />
        <path d="M152 136 C176 133 200 128 220 121" />
        <path d="M154 147 C174 144 194 139 210 133" />
      </g>
      {/* palm crease */}
      <path
        d="M74 140 C88 152 106 158 128 159"
        fill="none"
        stroke="var(--skin-line)"
        strokeLinecap="round"
        strokeWidth="1.8"
        opacity="0.26"
      />

      {/* the pastry settles into the palm */}
      <ellipse cx="140" cy="116" rx="60" ry="8" fill="var(--skin-line)" opacity="0.18" />

      {/* croissant */}
      <g transform="translate(-28.3 -6.6) scale(1.066 1.083) rotate(-6 157 79)">
        <path
          d="M96 110 C86 80 102 54 132 48 C158 43 184 48 200 60 C218 74 224 96 214 110
             C206 115 198 111 196 101 C191 95 172 92 150 92 C126 92 108 95 104 101
             C102 111 102 115 96 110 Z"
          fill="var(--crust)"
        />
        {/* glaze along the top of the bake */}
        <path
          d="M101 96 C98 72 116 53 145 50 C165 48 182 51 194 58
             C170 55 146 59 129 70 C113 80 104 88 101 96 Z"
          fill="var(--crust-light)"
        />
        {/* lamination seams */}
        <g
          fill="none"
          stroke="var(--crust-dark)"
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.5"
        >
          <path d="M103 80 C108 88 110 95 110 101" />
          <path d="M118 60 C122 72 124 82 124 93" />
          <path d="M141 50 C143 64 144 76 144 90" />
          <path d="M167 49 C166 63 166 76 166 90" />
          <path d="M190 57 C186 69 185 80 186 92" />
          <path d="M208 79 C204 88 203 95 203 101" />
        </g>
        {/* underside, in shadow against the palm */}
        <path
          d="M104 101 C108 95 126 92 150 92 C172 92 191 95 196 101
             C186 97 168 96 150 96 C130 96 112 97 104 101 Z"
          fill="var(--crust-dark)"
          opacity="0.28"
        />
      </g>

      {/* ball of the thumb, on the near edge of the palm */}
      <path
        d="M58 126 C50 138 48 154 52 168 C56 156 60 143 66 133 Z"
        fill="var(--skin-shade)"
        opacity="0.55"
      />
    </svg>
  );
}
