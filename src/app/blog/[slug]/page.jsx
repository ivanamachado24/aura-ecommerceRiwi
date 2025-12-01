import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));
  return files.map((f) => ({ slug: f.replace(".md", "") }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const content = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  return <article>{content}</article>;
}