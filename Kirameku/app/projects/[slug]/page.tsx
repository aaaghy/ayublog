"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Project = {
  name: string;
  description: string;
  long_description: string;
  cover_image: string;
  tech_stack: string[];
  link_github: string;
  link_gitee: string;
  link_live: string;
  link_docs: string;
  status_label: string;
};

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(String(params.slug || ""));
  const [project, setProject] = useState<Project | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${encodeURIComponent(slug)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("missing");
        return r.json();
      })
      .then(setProject)
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-500">项目不存在。请把后台 Slug 改成短英文，例如 pdfcraft。</div>;
  }
  if (!project) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-500">加载中...</div>;
  }

  const links = [
    ["GitHub", project.link_github],
    ["Gitee", project.link_gitee],
    ["线上地址", project.link_live],
    ["文档", project.link_docs],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/projects" className="text-sm text-sky-600 dark:text-sky-400">返回项目列表</Link>
      <article className="mt-4 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 md:p-10">
        {project.cover_image && <img src={project.cover_image} alt="" className="mb-6 h-56 w-full rounded-2xl object-cover" />}
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">{project.name}</h1>
        {project.status_label && <p className="mt-2 text-sm text-sky-600 dark:text-sky-400">{project.status_label}</p>}
        {project.description && <p className="mt-4 text-slate-600 dark:text-slate-300">{project.description}</p>}
        <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-800 dark:text-slate-100">{project.long_description || "还没有详细介绍。"}</div>
        <div className="mt-6 flex flex-wrap gap-2">
          {(project.tech_stack || []).map((tag) => (
            <span key={tag} className="rounded-md border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase text-sky-600 dark:text-sky-400">{tag}</span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {links.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400">{label}</a>
          ))}
        </div>
      </article>
    </div>
  );
}
