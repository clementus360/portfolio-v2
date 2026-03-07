import type { CaseStudyStat } from "@/types/caseStudy";

type CaseStudyStatsProps = {
    title?: string;
    stats: CaseStudyStat[];
};

export default function CaseStudyStats({ title, stats }: CaseStudyStatsProps) {
    return (
        <section className="border border-[var(--menu-border)] bg-[var(--weather-card-bg)] p-6 md:p-8 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold font-nexa text-primary uppercase">
                {title || "Mission Impact"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {stats.map((stat) => (
                    <article key={`${stat.label}-${stat.value}`} className="space-y-2 border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4">
                        <p className="text-3xl md:text-4xl font-extrabold font-nexa leading-none text-[var(--foreground)] uppercase">
                            {stat.value}
                        </p>
                        <p className="text-xs uppercase tracking-[0.16em] text-primary font-medium font-space-mono">
                            {stat.label}
                        </p>
                        {stat.description && (
                            <p className="text-sm md:text-base text-[var(--foreground)]/80 leading-relaxed font-space-mono">
                                {stat.description}
                            </p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
