import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Блог о 3D печати</title>
        <meta name="description" content="Модели, которые я напечатал на 3D принтере" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-ink-primary">
          Мои 3D-модели
        </h1>

        <div className="grid gap-6">
          {posts.map(({ slug, frontmatter }) => (
            <Link
              href={`/posts/${slug}`}
              key={slug}
              className="block p-6 bg-surface-primary border border-frame-primary/50 rounded-lg hover:shadow-lg hover:border-ink-accent transition"
            >
              <h2 className="text-2xl font-bold mb-2 text-ink-primary">{frontmatter.title}</h2>
              <p className="text-ink-primary/70">{frontmatter.date}</p>
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
