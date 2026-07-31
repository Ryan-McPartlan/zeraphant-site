import Link from "next/link";
import { type ReactNode } from "react";

import { resume, type ResumeBullet } from "~/lib/honor/resume";

function Row({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <div className="min-w-0">{left}</div>
      <div className="shrink-0 text-right">{right}</div>
    </div>
  );
}

function BulletText({ item }: { item: ResumeBullet }) {
  if (typeof item === "string") return item;
  return (
    <>
      {item.before}
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="text-[#0563c1] underline"
      >
        {item.label}
      </a>
      {item.after}
    </>
  );
}

function Bullets({ items }: { items: readonly ResumeBullet[] }) {
  return (
    <ul className="honor-resume-bullets mt-1.5 space-y-1 pl-5">
      {items.map((item) => (
        <li key={typeof item === "string" ? item : item.href}>
          <BulletText item={item} />
        </li>
      ))}
    </ul>
  );
}

export function CareerPage() {
  const { contact } = resume;

  return (
    <main className="honor-career relative z-20 min-h-dvh bg-[#fafafa] text-[#111] selection:bg-[#dbe4f0] selection:text-[#111]">
      <div className="mx-auto max-w-[46rem] px-6 py-10 sm:px-10 sm:py-14">
        <Link
          href="/honor"
          className="font-resume text-[0.95rem] text-[#444] underline-offset-4 transition-colors hover:text-[#111] hover:underline"
        >
          ← Honor
        </Link>

        <article className="font-resume mt-8 text-[0.98rem] leading-[1.45] sm:text-[1.05rem] sm:leading-[1.5]">
          <header className="text-center">
            <h1 className="text-[2.15rem] leading-none font-bold tracking-tight sm:text-[2.55rem]">
              {resume.name}
            </h1>
            <hr className="mx-auto mt-3 mb-2.5 w-full border-0 border-t border-[#111]" />
            <p className="text-[0.88rem] leading-snug sm:text-[0.95rem]">
              {contact.city} •{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-[#0563c1] underline"
              >
                {contact.email}
              </a>{" "}
              • {contact.phone}
            </p>
          </header>

          <section className="mt-8">
            <h2 className="text-center text-[1.15rem] font-bold">Experience</h2>
            {resume.experience.map((employer) => (
              <div key={employer.name} className="mt-3">
                <Row
                  left={<span className="font-bold">{employer.name}</span>}
                  right={<span className="font-bold">{employer.location}</span>}
                />
                {employer.roles.map((role) => (
                  <div key={`${role.title}-${role.dates}`} className="mt-3">
                    <Row
                      left={<span className="font-bold">{role.title}</span>}
                      right={<span className="font-bold">{role.dates}</span>}
                    />
                    <Bullets items={role.bullets} />
                  </div>
                ))}
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="text-center text-[1.15rem] font-bold">Education</h2>
            <div className="mt-3">
              <Row
                left={
                  <span className="font-bold">{resume.education.school}</span>
                }
                right={
                  <span className="font-bold">{resume.education.location}</span>
                }
              />
              <Row
                left={
                  <span className="font-bold">{resume.education.degree}</span>
                }
                right={<span>{resume.education.dates}</span>}
              />
              <Bullets items={resume.education.bullets} />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-center text-[1.15rem] font-bold">
              Leadership &amp; Life
            </h2>
            <ul className="honor-resume-bullets mt-3 space-y-1 pl-5">
              {resume.leadership.map((item) =>
                item.kind === "text" ? (
                  <li key={item.text}>{item.text}</li>
                ) : (
                  <li key={item.href}>
                    {item.before}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0563c1] underline"
                    >
                      {item.label}
                    </a>
                    {item.after}
                  </li>
                ),
              )}
            </ul>
          </section>

          <section className="mt-8 pb-8">
            <h2 className="text-center text-[1.15rem] font-bold">
              Skills &amp; Tech stack
            </h2>
            <div className="mt-3 space-y-1">
              {resume.skills.map((skill) => (
                <p key={skill.label}>
                  <span className="font-bold">{skill.label}:</span>{" "}
                  {skill.items}
                </p>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
