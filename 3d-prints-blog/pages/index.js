import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>3D PLP Blog</title>
        <meta name="description" content="Models, which I printed on a 3D printer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-ink-primary dark:text-ink-secondary">
          3D PLP Blog
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
          {posts.map(({ slug, frontmatter }) => (
            <Link
              href={`/posts/${slug}`}
              key={slug}
              className="
                    block border rounded-lg hover:shadow-lg transition
                    bg-surface-primary
                    dark:bg-surface-primary-dark
                    border-frame-primary/50
                    dark:border-frame-secondary/50
                    hover:border-ink-accent
                    dark:hover:border-ink-accent-dark">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                width={450}
                height={450}
                className="object-cover rounded-t-lg aspect-square"
                priority
              />
              <div className="p-3">
                <h2 className="text-2xl font-bold mb-2 text-ink-primary dark:text-ink-secondary">{frontmatter.title}</h2>
                <p className="text-ink-primary/70 dark:text-ink-secondary/70">{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // 1. Получаем файлы из папки posts
  const files = fs.readdirSync(path.join('posts'));

  // 2. Получаем slug и frontmatter из каждого файла
  const posts = files.map((filename) => {
    // Убираем .md из имени файла, чтобы получить slug
    const slug = filename.replace('.md', '');

    // Читаем содержимое файла
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    // Используем gray-matter для парсинга
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  // Сортируем посты по дате
  posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  return {
    props: {
      posts,
    },
  };
}
