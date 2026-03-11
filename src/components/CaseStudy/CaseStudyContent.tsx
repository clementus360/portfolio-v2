import Image from "next/image";
import type {
  CaseStudy,
  CaseStudyGalleryBlock,
  CaseStudyInlineImageBlock,
  CaseStudyPaletteBlock,
  CaseStudyStatsBlock,
  CaseStudyTextBlock,
} from "@/types/caseStudy";
import CaseStudyStats from "./CaseStudyStats";

type CaseStudyContentProps = {
  caseStudy: CaseStudy;
};

export default function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const textBlocks = caseStudy.blocks.filter(
    (block): block is CaseStudyTextBlock => block.type === "text",
  );
  const inlineImageBlocks = caseStudy.blocks.filter(
    (block): block is CaseStudyInlineImageBlock => block.type === "inlineImage",
  );
  const paletteBlocks = caseStudy.blocks.filter(
    (block): block is CaseStudyPaletteBlock => block.type === "palette",
  );
  const galleryBlocks = caseStudy.blocks.filter(
    (block): block is CaseStudyGalleryBlock => block.type === "gallery",
  );
  const statsBlocks = caseStudy.blocks.filter(
    (block): block is CaseStudyStatsBlock => block.type === "stats",
  );

  const rationaleParagraphs =
    caseStudy.rationale && caseStudy.rationale.length > 0
      ? caseStudy.rationale
      : textBlocks.slice(0, 2).map((block) => block.content);

  return (
    <main id="main-content" className="px-4 md:px-16 lg:px-32 pt-36 md:pt-40 pb-20">
      <article className="max-w-5xl mx-auto space-y-12 md:space-y-14">
        <header className="relative border border-[var(--menu-border)] bg-[var(--weather-card-bg)] p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <span className="absolute -top-3 left-5 border border-[var(--menu-border)] bg-[var(--background)] px-2 py-0.5 text-[10px] font-space-mono font-bold uppercase tracking-[0.15em] text-primary">
            Case File
          </span>

          <div className="space-y-6">
            <p className="font-space-mono text-xs uppercase tracking-[0.2em] text-primary font-medium">
              {caseStudy.year} {caseStudy.client ? `• ${caseStudy.client}` : ""}
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-nexa leading-[1.02] uppercase">
              {caseStudy.title}
            </h1>
            <p className="font-space-mono text-sm md:text-base text-[var(--foreground)]/80 uppercase tracking-[0.06em]">
              {caseStudy.subtitle}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[var(--foreground)]/90 max-w-3xl">
              {caseStudy.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4">
                <h2 className="font-space-mono text-[11px] uppercase tracking-[0.16em] text-primary mb-3">
                  Operative Role
                </h2>
                <ul className="space-y-1.5">
                  {caseStudy.role.map((item) => (
                    <li
                      key={item}
                      className="font-space-mono text-sm text-[var(--foreground)]/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4">
                <h2 className="font-space-mono text-[11px] uppercase tracking-[0.16em] text-primary mb-3">
                  Equipment
                </h2>
                <ul className="space-y-1.5">
                  {caseStudy.stack.map((item) => (
                    <li
                      key={item}
                      className="font-space-mono text-sm text-[var(--foreground)]/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        {rationaleParagraphs.length > 0 && (
          <section className="border border-[var(--menu-border)] bg-[var(--weather-card-bg)] p-6 md:p-8 space-y-5">
            <h3 className="font-nexa text-2xl md:text-3xl font-bold text-primary uppercase">
              Mission Brief
            </h3>
            <div className="space-y-4 max-w-3xl">
              {rationaleParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base md:text-lg leading-relaxed text-[var(--foreground)]/95"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {textBlocks.length > 0 && (
          <section className="border border-[var(--menu-border)] bg-[var(--weather-card-bg)] p-6 md:p-8 space-y-6">
            <h3 className="font-nexa text-2xl md:text-3xl font-bold text-primary uppercase">
              Case Sections
            </h3>

            <div
              className={`grid grid-cols-1 gap-5 ${
                textBlocks.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {textBlocks.map((block, index) => (
                <article
                  key={`${block.title || "section"}-${index}`}
                  className="border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-5 space-y-3"
                >
                  <h4 className="font-space-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                    {block.title || `Section ${index + 1}`}
                  </h4>
                  <p className="text-base leading-relaxed text-[var(--foreground)]/95">
                    {block.content}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {paletteBlocks.length > 0 && (
          <section className="border border-[var(--menu-border)] bg-[var(--weather-card-bg)] p-6 md:p-8 space-y-6">
            <h3 className="font-nexa text-2xl md:text-3xl font-bold text-primary uppercase">
              Visual Identity
            </h3>

            <div className="space-y-6">
              {paletteBlocks.map((block, blockIndex) => (
                <article
                  key={`${block.title || "palette"}-${blockIndex}`}
                  className="border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-5 space-y-4"
                >
                  <div className="space-y-2">
                    <h4 className="font-space-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                      {block.title || "Palette"}
                    </h4>
                    {block.description && (
                      <p className="text-sm md:text-base leading-relaxed text-[var(--foreground)]/90">
                        {block.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {block.colors.map((color) => (
                      <div
                        key={`${color.name}-${color.hex}`}
                        className="border border-[var(--foreground)]/10 bg-[var(--background)] p-2"
                      >
                        <div
                          className="h-14 w-full border border-[var(--foreground)]/10"
                          style={{ backgroundColor: color.hex }}
                          aria-label={`${color.name} swatch`}
                        />
                        <div className="mt-2 space-y-1">
                          <p className="font-space-mono text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)]/90">
                            {color.name}
                          </p>
                          {color.role && (
                            <p className="text-xs text-[var(--foreground)]/70">
                              {color.role}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="border border-[var(--menu-border)] bg-[var(--weather-card-bg)] p-6 md:p-8 space-y-5">
          <h3 className="font-nexa text-2xl md:text-3xl font-bold text-primary uppercase">
            Evidence
          </h3>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            <figure className="break-inside-avoid mb-5 border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-2">
              <div className="relative w-full overflow-hidden border border-[var(--foreground)]/10">
                <Image
                  src={caseStudy.coverImage.src}
                  alt={caseStudy.coverImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              {caseStudy.coverImage.caption && (
                <figcaption className="font-space-mono text-[11px] text-[var(--foreground)]/70 border-l-2 border-primary pl-3 mt-2 uppercase tracking-[0.05em]">
                  {caseStudy.coverImage.caption}
                </figcaption>
              )}
            </figure>

            {inlineImageBlocks.map((block, index) => (
              <figure
                key={`${block.image.src}-${block.image.alt}-${index}`}
                className="break-inside-avoid mb-5 border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-2"
              >
                <div className="relative w-full overflow-hidden border border-[var(--foreground)]/10">
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {(block.image.caption || block.title) && (
                  <figcaption className="font-space-mono text-[11px] text-[var(--foreground)]/70 border-l-2 border-primary pl-3 mt-2 uppercase tracking-[0.05em]">
                    {block.title || block.image.caption}
                  </figcaption>
                )}
              </figure>
            ))}

            {galleryBlocks.map((block, galleryIndex) =>
              block.images.map((image, imageIndex) => (
                <figure
                  key={`${image.src}-${image.alt}-${galleryIndex}-${imageIndex}`}
                  className="break-inside-avoid mb-5 border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-2"
                >
                  <div className="relative w-full overflow-hidden border border-[var(--foreground)]/10">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {(image.caption || (imageIndex === 0 && block.title)) && (
                    <figcaption className="font-space-mono text-[10px] text-[var(--foreground)]/70 border-l-2 border-primary pl-2 mt-2 uppercase tracking-[0.05em]">
                      {image.caption || block.title}
                    </figcaption>
                  )}
                </figure>
              )),
            )}
          </div>
        </section>

        {statsBlocks.map((block, index) => (
          <CaseStudyStats
            key={`${block.title || "stats"}-${index}`}
            title={block.title}
            stats={block.stats}
          />
        ))}
      </article>
    </main>
  );
}
