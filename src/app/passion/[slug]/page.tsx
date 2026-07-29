import { type Metadata } from "next";
import { notFound } from "next/navigation";

import {
  passionTopicFromSlug,
  PassionTopicPage,
} from "~/components/passion/topic-page";
import { PASSION_TOPICS } from "~/lib/passion";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PASSION_TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = passionTopicFromSlug(slug);
  return { title: topic ? `${topic.label} · Passion` : "Passion" };
}

export default async function PassionTopicRoute({ params }: Props) {
  const { slug } = await params;
  const topic = passionTopicFromSlug(slug);
  if (!topic) notFound();
  return <PassionTopicPage topic={topic} />;
}
