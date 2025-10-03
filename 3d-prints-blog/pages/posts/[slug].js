import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import AdBlock from '../../components/AdBlock';

export default function PostPage({ frontmatter, mdxSource }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} | 3D PLP Blog</title>
        <meta name="description" content={frontmatter.description || 'A post from 3D PLP Blog'} />
      </Head>

      <div className="relative h-96 w-full">
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center p-4">
            {frontmatter.title}
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <article className="prose dark:prose-invert max-w-none">
          <MDXRemote {...mdxSource} />
          <AdBlock client="ca-pub-9677777917176715" slot="7325512253" />
        </article>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return { props: { frontmatter, mdxSource, slug } };
}