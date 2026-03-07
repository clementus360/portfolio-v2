import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyContent from "@/components/CaseStudy/CaseStudyContent";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${caseStudy.title} | Ishimwe Clement`,
    description: caseStudy.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyContent caseStudy={caseStudy} />;
}
