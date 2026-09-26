/**
 * Small inline packshots for the POS demo catalogue. Drawn as SVG so they stay crisp at any
 * size, need no network request and never break; each is generic packaging, not a brand's artwork.
 */
export type ProductArtId = "ace" | "cef3" | "cerelac" | "dove" | "rice" | "oil";

export const productTint: Record<ProductArtId, string> = {
  ace: "from-sky-500/25 to-sky-900/10",
  cef3: "from-rose-500/25 to-rose-900/10",
  cerelac: "from-amber-400/30 to-amber-900/10",
  dove: "from-indigo-400/25 to-indigo-900/10",
  rice: "from-lime-400/20 to-lime-900/10",
  oil: "from-yellow-400/25 to-yellow-900/10",
};

export default function ProductArt({ id, className = "" }: { id: ProductArtId; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {art[id]}
    </svg>
  );
}

const art: Record<ProductArtId, JSX.Element> = {
  // blister strip of white tablets
  ace: (
    <g>
      <rect x="10" y="14" width="44" height="36" rx="5" fill="#cbd5e1" />
      <rect x="10" y="14" width="44" height="8" rx="4" fill="#0284c7" />
      <text x="32" y="20.5" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#fff" fontFamily="sans-serif">500mg</text>
      {[0, 1, 2, 3].map((c) =>
        [0, 1].map((r) => (
          <g key={`${c}-${r}`}>
            <ellipse cx={17 + c * 10} cy={30 + r * 11} rx="4" ry="3.6" fill="#f8fafc" stroke="#94a3b8" strokeWidth=".8" />
            <line x1={14.5 + c * 10} y1={30 + r * 11} x2={19.5 + c * 10} y2={30 + r * 11} stroke="#cbd5e1" strokeWidth=".8" />
          </g>
        ))
      )}
    </g>
  ),
  // medicine box with capsules in front
  cef3: (
    <g>
      <path d="M14 18 L44 18 L50 13 L20 13 Z" fill="#fecdd3" />
      <path d="M44 18 L50 13 L50 44 L44 49 Z" fill="#e11d48" />
      <rect x="14" y="18" width="30" height="31" fill="#fff1f2" />
      <rect x="14" y="24" width="30" height="8" fill="#e11d48" />
      <text x="29" y="30.3" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff" fontFamily="sans-serif">CEF-3</text>
      <text x="29" y="40" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="#9f1239" fontFamily="sans-serif">200 mg</text>
      <g transform="rotate(-25 44 52)">
        <rect x="36" y="49" width="16" height="6" rx="3" fill="#fb7185" />
        <rect x="44" y="49" width="8" height="6" rx="3" fill="#fef3c7" />
      </g>
    </g>
  ),
  // cereal box with a bowl on the front
  cerelac: (
    <g>
      <path d="M17 12 L45 12 L49 8 L21 8 Z" fill="#fde68a" />
      <path d="M45 12 L49 8 L49 52 L45 56 Z" fill="#d97706" />
      <rect x="17" y="12" width="28" height="44" fill="#fbbf24" />
      <rect x="17" y="15" width="28" height="7" fill="#1d4ed8" />
      <text x="31" y="20.2" textAnchor="middle" fontSize="4.6" fontWeight="800" fill="#fff" fontFamily="sans-serif">WHEAT</text>
      <path d="M22 36 Q31 48 40 36 Z" fill="#fff" />
      <ellipse cx="31" cy="36" rx="9" ry="2.6" fill="#fef3c7" />
      <text x="31" y="52" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#78350f" fontFamily="sans-serif">400g</text>
    </g>
  ),
  // shampoo bottle
  dove: (
    <g>
      <rect x="27" y="7" width="10" height="7" rx="1.5" fill="#1e3a8a" />
      <path d="M23 16 Q23 13 27 13 L37 13 Q41 13 41 16 L43 54 Q43 57 40 57 L24 57 Q21 57 21 54 Z" fill="#f8fafc" />
      <path d="M22.4 30 L41.6 30 L42.4 46 L21.6 46 Z" fill="#1e40af" />
      <text x="32" y="37" textAnchor="middle" fontSize="3.8" fontWeight="700" fill="#fff" fontFamily="serif">shampoo</text>
      <text x="32" y="43" textAnchor="middle" fontSize="4" fill="#bfdbfe" fontFamily="sans-serif">340 ml</text>
      <path d="M25 17 Q24 30 24.5 50" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
    </g>
  ),
  // rice sack
  rice: (
    <g>
      <path d="M16 14 Q32 9 48 14 L51 52 Q32 58 13 52 Z" fill="#f5f0e1" />
      <path d="M16 14 Q32 18 48 14" stroke="#d6cfb8" strokeWidth="1.5" fill="none" />
      <path d="M19 10 Q32 5 45 10 L48 14 Q32 9 16 14 Z" fill="#e7dfc6" />
      <rect x="19" y="24" width="26" height="18" rx="3" fill="#15803d" />
      <text x="32" y="32" textAnchor="middle" fontSize="5" fontWeight="800" fill="#fff" fontFamily="sans-serif">MINIKET</text>
      <text x="32" y="38.5" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="#bbf7d0" fontFamily="sans-serif">5 kg</text>
      {[22, 28, 36, 42].map((x) => (
        <ellipse key={x} cx={x} cy="48" rx="1.4" ry=".8" fill="#d6cfb8" />
      ))}
    </g>
  ),
  // cooking-oil bottle with handle
  oil: (
    <g>
      <rect x="28" y="6" width="9" height="6" rx="1.5" fill="#dc2626" />
      <path d="M24 16 Q24 12 29 12 L36 12 Q41 12 41 16 L45 24 L45 54 Q45 58 41 58 L23 58 Q19 58 19 54 L19 24 Z" fill="#facc15" fillOpacity=".92" />
      <path d="M41 17 Q50 19 47 32" stroke="#eab308" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="19" y="32" width="26" height="15" fill="#16a34a" />
      <text x="32" y="39" textAnchor="middle" fontSize="4.8" fontWeight="800" fill="#fff" fontFamily="sans-serif">SOYBEAN</text>
      <text x="32" y="44.5" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="#dcfce7" fontFamily="sans-serif">2 L</text>
      <path d="M22 26 L22 54" stroke="#fef9c3" strokeWidth="1.5" strokeOpacity=".7" />
    </g>
  ),
};
