'use client';

interface HeroStat {
  value: string;
  label: string;
}

interface HeroPanelProps {
  badgeText: string;
  title: string;
  highlight?: string;
  subtitle: string;
  stats?: HeroStat[];
  features?: string[];
  showOnMobile?: boolean;
}

export function HeroPanel({
  badgeText,
  title,
  highlight,
  subtitle,
  stats = [],
  features = [],
  showOnMobile = false,
}: HeroPanelProps) {
  return (
    <div className={showOnMobile ? '' : 'hidden lg:block'}>
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-600 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          {badgeText}
        </div>

        <h1 className="text-4xl font-black text-gray-900 leading-tight">
          {title}
          {highlight ? <span className="block text-orange-600">{highlight}</span> : null}
        </h1>

        <p className="text-xl text-gray-600 max-w-md mx-auto">{subtitle}</p>

        {stats.length > 0 ? (
          <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-orange-600">{s.value}</div>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        {features.length > 0 ? (
          <div className="space-y-4">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{f}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
