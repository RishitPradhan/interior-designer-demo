import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: 'std-1',
    name: 'Integrated Atelier Process',
    role: '01 / PROCESS CONTROL',
    // architectural blueprints / design desk
    image: 'https://images.unsplash.com/photo-1503387762-592dec58ef4e?q=80&w=640&fit=crop',
    description: 'From initial architectural sketches to handovers and fine curation, we manage every detail directly in-house. We never outsource your vision.'
  },
  {
    id: 'std-2',
    name: 'Fiscal Transparency',
    role: '02 / BUDGET SECURITY',
    // luxury living room
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=640&fit=crop',
    description: 'A detailed itemized prospectus is locked before a single hammer is raised. No hidden fees, no budget overruns — ever.'
  },
  {
    id: 'std-3',
    name: 'Personal Director Assignment',
    role: '03 / DIRECT LIAISON',
    // architect reviewing plans
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=640&fit=crop',
    description: 'A single senior architect directs your commission from foundation to finishing touch — your one direct point of contact.'
  },
  {
    id: 'std-4',
    name: 'Noble Material Sourcing',
    role: '04 / PREMIUM MATERIALS',
    // marble / stone texture
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=640&fit=crop',
    description: 'Hand-cut Italian travertine, hand-loomed organic linens, and seasoned European white oak — personally sourced by our principals.'
  },
  {
    id: 'std-5',
    name: 'Absolute Timeline Commitment',
    role: '05 / PUNCTUAL HANDOVER',
    // modern completed home exterior
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=640&fit=crop',
    description: 'Project phases bind to strict completion dates. We treat your move-in day as an unyielding, contractual obligation.'
  },
  {
    id: 'std-6',
    name: 'Immersive Mockup Experience',
    role: '06 / VISUAL CERTAINTY',
    // 3D rendered interior visualization
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=640&fit=crop',
    description: 'Physical material sample boards paired with photorealistic 3D renders — experience the space entirely before the first build.'
  }
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-10 xl:gap-16 select-none w-full max-w-6xl mx-auto py-4 px-0 font-sans">
      
      {/* ── Left: staggered photo grid ── */}
      <div className="flex gap-3 flex-shrink-0 w-full lg:w-auto justify-center lg:justify-start">
        {/* Column 1 — top-aligned */}
        <div className="flex flex-col gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[130px] h-[145px] md:w-[160px] md:h-[175px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-3 mt-14 md:mt-16">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[145px] h-[160px] md:w-[178px] md:h-[195px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 — offset midway */}
        <div className="flex flex-col gap-3 mt-7 md:mt-8">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[135px] h-[150px] md:w-[165px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: standards list ── */}
      <div className="flex flex-col gap-0 flex-1 w-full lg:pt-2 divide-y divide-white/8">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  key?: any;
  member: TeamMember;
  className: string;
  hoveredId: any;
  onHover: any;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 transition-all duration-500',
        className,
        isDimmed ? 'opacity-30 scale-[0.97]' : 'opacity-100 scale-100',
        isActive ? 'ring-2 ring-beige-warm/40 shadow-2xl shadow-black/50' : 'shadow-md shadow-black/30'
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter,transform] duration-700 ease-out"
        style={{
          filter: isActive
            ? 'grayscale(0) brightness(1.1) contrast(1.05)'
            : 'grayscale(0.7) brightness(0.55)',
          transform: isActive ? 'scale(1.08)' : 'scale(1.0)'
        }}
      />
      {/* Subtle number label on hover */}
      <div className={cn(
        "absolute bottom-2 left-3 text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300",
        isActive ? "text-beige-warm opacity-100" : "text-transparent opacity-0"
      )}>
        {member.role.split('/')[0].trim()}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Standards row
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  key?: any;
  member: TeamMember;
  hoveredId: any;
  onHover: any;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 py-4 text-left group',
        isDimmed ? 'opacity-35' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-3">
        {/* Animated accent pill */}
        <span
          className={cn(
            'h-2 rounded-full flex-shrink-0 transition-all duration-400',
            isActive ? 'bg-beige-warm w-8' : 'bg-beige-warm/25 w-3',
          )}
        />
        <span
          className={cn(
            'font-serif tracking-wide transition-colors duration-300 leading-tight',
            isActive ? 'text-white text-xl' : 'text-stone-300 text-base md:text-lg',
          )}
        >
          {member.name}
        </span>
      </div>

      {/* Role tag */}
      <p className="mt-1 pl-[44px] text-[8px] md:text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-beige-warm/50">
        {member.role}
      </p>

      {/* Description expands on hover */}
      <div
        className={cn(
          "pl-[44px] transition-all duration-500 ease-in-out overflow-hidden font-sans font-light text-stone-400 text-xs md:text-sm leading-relaxed",
          isActive ? "max-h-24 opacity-100 mt-2.5" : "max-h-0 opacity-0 mt-0"
        )}
      >
        {member.description}
      </div>
    </div>
  );
}
