export type CaseStudyMedia = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudyStat = {
  label: string;
  value: string;
  description?: string;
};

export type CaseStudyTextBlock = {
  type: "text";
  title?: string;
  content: string;
};

export type CaseStudyPaletteColor = {
  name: string;
  hex: string;
  role?: string;
};

export type CaseStudyPaletteBlock = {
  type: "palette";
  title?: string;
  description?: string;
  colors: CaseStudyPaletteColor[];
};

export type CaseStudyInlineImageBlock = {
  type: "inlineImage";
  title?: string;
  image: CaseStudyMedia;
};

export type CaseStudyGalleryBlock = {
  type: "gallery";
  title?: string;
  images: CaseStudyMedia[];
};

export type CaseStudyStatsBlock = {
  type: "stats";
  title?: string;
  stats: CaseStudyStat[];
};

export type CaseStudyBlock =
  | CaseStudyTextBlock
  | CaseStudyPaletteBlock
  | CaseStudyInlineImageBlock
  | CaseStudyGalleryBlock
  | CaseStudyStatsBlock;

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  rationale?: string[];
  year: string;
  client?: string;
  role: string[];
  stack: string[];
  coverImage: CaseStudyMedia;
  blocks: CaseStudyBlock[];
  impact?: 'high' | 'notable' | 'personal';
  discipline?: string;
  mission?: string;
};
