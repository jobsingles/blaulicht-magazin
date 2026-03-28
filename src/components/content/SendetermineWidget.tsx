'use client';

import { useEffect, useState } from 'react';

interface Episode {
  season: number;
  number: number;
  name: string;
  airdate: string;
  airtime: string;
}

interface Props {
  seriesId: 'bergdoktor' | 'tatort-zuerich';
}

const SHOWS = {
  'bergdoktor': { tvmazeId: 6487, sender: 'ZDF', label: 'Der Bergdoktor' },
  'tatort-zuerich': { tvmazeId: 6446, sender: 'SRF / Das Erste', label: 'Tatort Zürich' },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  return `${days[d.getDay()]}. ${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function SendetermineWidget({ seriesId }: Props) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const show = SHOWS[seriesId];

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${show.tvmazeId}/episodes`)
      .then(r => r.json())
      .then((data: Episode[]) => {
        const today = new Date().toISOString().split('T')[0];
        const upcoming = data.filter(ep => ep.airdate >= today);
        const recent = data.filter(ep => ep.airdate < today).slice(-3);
        setEpisodes([...recent, ...upcoming].slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [show.tvmazeId]);

  if (loading) {
    return (
      <div className="bg-surface rounded-xl p-5 animate-pulse">
        <div className="h-5 bg-foreground/10 rounded w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-4 bg-foreground/10 rounded w-full" />)}
        </div>
      </div>
    );
  }

  if (episodes.length === 0) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-surface rounded-xl p-5 border border-foreground/10">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📺</span>
        <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
          Sendetermine — {show.label}
        </h3>
      </div>
      <div className="space-y-2">
        {episodes.map((ep, i) => {
          const isPast = ep.airdate < today;
          const isNext = !isPast && (i === 0 || episodes[i - 1]?.airdate < today);
          return (
            <div
              key={`${ep.season}-${ep.number}`}
              className={`flex items-start gap-3 text-sm py-1.5 ${
                isPast ? 'opacity-50' : ''
              } ${isNext ? 'border-l-2 border-brand-orange pl-3 -ml-[2px]' : ''}`}
            >
              <span className={`font-mono text-xs whitespace-nowrap mt-0.5 ${isNext ? 'text-brand-orange font-bold' : 'text-foreground/60'}`}>
                {formatDate(ep.airdate)}
              </span>
              <span className="text-foreground/40 mt-0.5">{ep.airtime || '20:15'}</span>
              <div className="flex-1 min-w-0">
                <span className={`block truncate ${isNext ? 'text-foreground font-semibold' : 'text-foreground/80'}`}>
                  {ep.name}
                </span>
                <span className="text-xs text-foreground/40">
                  S{ep.season} E{ep.number} · {show.sender}
                </span>
              </div>
              {isNext && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange whitespace-nowrap mt-0.5">
                  Nächste
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-foreground/30 mt-3">
        Daten: TVmaze · Ohne Gewähr
      </p>
    </div>
  );
}
