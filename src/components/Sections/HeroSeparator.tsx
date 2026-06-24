export default function HeroSeparator() {
    return (
        <section
            aria-hidden="true"
            className="relative z-10 w-full mt-10 md:mt-14 mb-8 md:mb-12"
        >
            <div className="mx-auto w-full max-w-[1440px] px-4 md:px-16 lg:px-32">
                <div className="relative h-36 md:h-52 overflow-hidden rounded-[32px] border border-black/10 bg-[linear-gradient(180deg,rgba(28,28,28,0.98)_0%,rgba(18,18,18,0.98)_55%,rgba(8,8,8,0.96)_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_18%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.55)_100%)]" />
                    <div className="absolute left-0 top-0 h-full w-8 md:w-14 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_100%)]" />
                    <div className="absolute right-0 top-0 h-full w-8 md:w-14 bg-[linear-gradient(270deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_100%)]" />
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/60" />

                    <div className="absolute inset-x-4 md:inset-x-10 top-1/2 -translate-y-1/2">
                        <div className="relative mx-auto h-20 md:h-28 max-w-[920px] rounded-[28px] border-[10px] border-black/80 bg-[radial-gradient(circle_at_center,rgba(240,240,240,0.16)_0%,rgba(160,160,160,0.08)_32%,rgba(15,15,15,0.8)_68%,rgba(0,0,0,0.96)_100%)] shadow-[inset_0_18px_30px_rgba(255,255,255,0.03),inset_0_-26px_40px_rgba(0,0,0,0.8),0_18px_45px_rgba(0,0,0,0.35)]">
                            <div className="absolute inset-[10px] rounded-[18px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_45%,rgba(0,0,0,0.65)_100%)]" />
                            <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                            <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-white/10" />
                            <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.18)]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}