import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';
import Image from 'next/image';

export default function PostPage({ frontmatter: { title, date, image }, content }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{title} | Блог о 3D печати</title>
      </Head>

      <article className="max-w-3xl mx-auto bg-surface-primary dark:bg-surface-primary-dark p-8 rounded-lg shadow-md">
        {image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4 text-ink-primary dark:text-ink-secondary">{title}</h1>
        <p className="text-ink-primary/70 dark:text-ink-secondary/70 mb-8">{date}</p>

        <div
          className="
                prose prose-lg max-w-none
                prose-headings:text-ink-primary
                prose-p:text-ink-primary/90
                prose-a:text-ink-accent
                hover:prose-a:text-ink-primary
                prose-strong:text-ink-primary
                prose-blockquote:border-l-frame-primary
                prose-blockquote:text-ink-primary/80
                prose-code:text-ink-secondary
                prose-li::marker:text-frame-primary
                dark:prose-invert
                dark:prose-a:text-ink-accent
                dark:hover:prose-a:text-ink-accent-dark"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></div>
      </article>
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
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}