import type { ReactNode } from 'react';

type ArtProps = { className?: string };

function Frame({ children, className }: ArtProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="16 26 108 72"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** A shared, very light counter line that ties the set together. */
function Rest({ y = 92, w = 86 }: { y?: number; w?: number }) {
  return (
    <line
      x1={70 - w / 2}
      y1={y}
      x2={70 + w / 2}
      y2={y}
      stroke="var(--rule-strong)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  );
}

export function AlmondCroissant({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest />
      <path
        d="M18 82 C21 50 42 30 70 30 C98 30 119 50 122 82 C116 86 108 84 105 76 C99 70 87 66 70 66 C53 66 41 70 35 76 C32 84 24 86 18 82 Z"
        fill="var(--crust)"
      />
      <path
        d="M25 70 C32 48 49 36 70 34 C84 33 96 36 105 42 C90 36 74 37 60 43 C44 50 32 59 25 70 Z"
        fill="var(--crust-light)"
      />
      <g fill="none" stroke="var(--crust-dark)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
        <path d="M41 49 C45 56 47 63 47 70" />
        <path d="M70 33 C70 43 70 50 70 57" />
        <path d="M99 49 C95 56 93 63 93 70" />
      </g>
      <g fill="var(--caramel)">
        <ellipse cx="58" cy="44" rx="6" ry="2.6" transform="rotate(-16 58 44)" />
        <ellipse cx="82" cy="47" rx="6" ry="2.6" transform="rotate(14 82 47)" />
        <ellipse cx="70" cy="60" rx="5.4" ry="2.4" transform="rotate(-6 70 60)" />
      </g>
    </Frame>
  );
}

export function PearDanish({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest w={78} />
      <ellipse cx="70" cy="60" rx="46" ry="30" fill="var(--crust)" />
      <ellipse cx="70" cy="58" rx="35" ry="21" fill="var(--crust-light)" />
      <ellipse cx="70" cy="58" rx="28" ry="16" fill="var(--frangipane)" />
      <g fill="var(--pear)" stroke="var(--pear-line)" strokeWidth="1.1">
        <path d="M50 60 C52 50 60 46 68 47 C64 55 60 61 56 65 Z" />
        <path d="M62 62 C64 51 72 47 80 48 C76 56 72 62 68 66 Z" />
        <path d="M74 62 C76 51 84 47 92 49 C87 57 82 62 79 66 Z" />
      </g>
      <path
        d="M24 60 C34 76 106 76 116 60"
        fill="none"
        stroke="var(--crust-dark)"
        strokeWidth="1.4"
        opacity="0.55"
      />
    </Frame>
  );
}

export function RyeTart({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest w={80} />
      <path
        d="M28 56 L112 56 L106 84 C105 88 101 90 96 90 L44 90 C39 90 35 88 34 84 Z"
        fill="var(--rye)"
      />
      <ellipse cx="70" cy="56" rx="42" ry="13" fill="var(--rye-light)" />
      <ellipse cx="70" cy="55" rx="34" ry="10" fill="var(--cocoa)" />
      <ellipse cx="62" cy="52" rx="12" ry="3.4" fill="var(--cocoa-light)" opacity="0.75" />
      <g fill="var(--warm-white)">
        <circle cx="78" cy="53" r="1.7" />
        <circle cx="86" cy="57" r="1.4" />
        <circle cx="70" cy="59" r="1.3" />
      </g>
      <g fill="none" stroke="var(--rye-dark)" strokeWidth="1.3" opacity="0.6">
        <path d="M46 62 L44 84" />
        <path d="M70 64 L70 86" />
        <path d="M94 62 L96 84" />
      </g>
    </Frame>
  );
}

export function MorningBun({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest w={72} />
      <path
        d="M30 62 C30 44 48 32 70 32 C92 32 110 44 110 62 L108 82 C108 87 103 90 96 90 L44 90 C37 90 32 87 32 82 Z"
        fill="var(--crust)"
      />
      <ellipse cx="70" cy="60" rx="40" ry="26" fill="var(--crust-light)" />
      <path
        d="M70 60 C70 52 62 48 55 51 C46 55 44 68 52 76 C62 86 82 84 90 72 C98 60 93 42 78 36"
        fill="none"
        stroke="var(--crust-dark)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <g fill="var(--butter)" opacity="0.9">
        <circle cx="58" cy="44" r="1.6" />
        <circle cx="88" cy="52" r="1.6" />
        <circle cx="66" cy="74" r="1.6" />
      </g>
    </Frame>
  );
}

export function Financier({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest w={70} />
      <path d="M34 58 L106 58 L98 90 L42 90 Z" fill="var(--rye)" />
      <path
        d="M34 58 C34 48 46 42 70 42 C94 42 106 48 106 58 C96 64 44 64 34 58 Z"
        fill="var(--financier)"
      />
      <path
        d="M46 50 C54 46 86 46 94 50 C84 53 56 53 46 50 Z"
        fill="var(--crust-light)"
        opacity="0.8"
      />
      <g fill="none" stroke="var(--rye-dark)" strokeWidth="1.3" opacity="0.5">
        <path d="M52 62 L48 88" />
        <path d="M70 63 L70 89" />
        <path d="M88 62 L92 88" />
      </g>
    </Frame>
  );
}

export function CaramelChoux({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest w={68} />
      <path
        d="M36 66 C36 44 51 30 70 30 C89 30 104 44 104 66 C104 80 90 90 70 90 C50 90 36 80 36 66 Z"
        fill="var(--crust)"
      />
      <path
        d="M40 60 C40 42 53 32 70 32 C87 32 100 42 100 60 C88 52 52 52 40 60 Z"
        fill="var(--craquelin)"
      />
      <g fill="none" stroke="var(--crust-dark)" strokeWidth="1.3" opacity="0.5">
        <path d="M52 40 C56 46 57 52 56 58" />
        <path d="M70 33 C70 42 70 50 70 56" />
        <path d="M88 40 C84 46 83 52 84 58" />
      </g>
      <path
        d="M46 66 C54 74 62 70 70 76 C78 82 88 74 96 68"
        fill="none"
        stroke="var(--caramel)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="63" r="1.6" fill="var(--warm-white)" />
      <circle cx="82" cy="66" r="1.4" fill="var(--warm-white)" />
    </Frame>
  );
}

export function MilleFeuille({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest w={76} />
      <rect x="34" y="76" width="72" height="12" fill="var(--crust)" />
      <rect x="34" y="66" width="72" height="10" fill="var(--cream-deep)" />
      <rect x="34" y="54" width="72" height="12" fill="var(--crust)" />
      <rect x="34" y="44" width="72" height="10" fill="var(--cream-deep)" />
      <rect x="34" y="32" width="72" height="12" fill="var(--crust-light)" />
      <g stroke="var(--cocoa)" strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M40 36 L100 36" />
        <path d="M40 41 L100 41" />
      </g>
      <g stroke="var(--crust-dark)" strokeWidth="1.1" fill="none" opacity="0.45">
        <path d="M34 60 L106 60" />
        <path d="M34 82 L106 82" />
      </g>
      <g fill="var(--caramel)">
        <circle cx="46" cy="70" r="2" />
        <circle cx="70" cy="70" r="2" />
        <circle cx="94" cy="70" r="2" />
      </g>
    </Frame>
  );
}

export function QuinceGalette({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Rest w={84} />
      <path
        d="M26 68 C26 46 46 32 70 32 C94 32 114 46 114 68 C114 80 96 88 70 88 C44 88 26 80 26 68 Z"
        fill="var(--crust)"
      />
      <path
        d="M40 62 C44 48 55 40 70 40 C85 40 96 48 100 62 C90 70 50 70 40 62 Z"
        fill="var(--quince)"
      />
      <g fill="var(--crust-light)">
        <path d="M32 60 C36 48 44 42 52 40 C46 48 42 54 41 62 Z" />
        <path d="M108 60 C104 48 96 42 88 40 C94 48 98 54 99 62 Z" />
        <path d="M62 36 C68 34 74 34 80 36 C74 39 68 39 62 36 Z" />
      </g>
      <g fill="none" stroke="var(--quince-line)" strokeWidth="1.2" opacity="0.8">
        <path d="M52 58 C58 52 66 50 74 52" />
        <path d="M66 64 C74 58 84 57 92 60" />
      </g>
      <g stroke="var(--herb)" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M76 48 L90 44" />
        <path d="M80 47 L79 43" />
        <path d="M84 46 L83 42" />
        <path d="M87 45 L86 41" />
      </g>
    </Frame>
  );
}
