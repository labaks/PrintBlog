import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default function PostPage({ frontmatter, content }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <main className="max-w-2xl mx-auto">
        <article className="prose lg:prose-xl">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          <p className="text-gray-500 mb-8">{frontmatter.date}</p>
          {frontmatter.image && <img src={frontmatter.image} alt={frontmatter.title} className="w-full rounded-lg mb-8" />}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false, // если slug не найден, будет 404
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  // Преобразуем Markdown в HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      frontmatter,
      content: contentHtml,
    },
  };
}
