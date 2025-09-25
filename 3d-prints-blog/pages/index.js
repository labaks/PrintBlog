import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Блог о 3D печати</title>
        <meta name="description" content="Модели, которые я напечатал на 3D принтере" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Мои 3D-модели
        </h1>

        <div className="grid gap-6">
          {posts.map(({ slug, frontmatter }) => (
            <Link
              href={`/posts/${slug}`}
              key={slug}
              className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-500 transition"
            >
              <h2 className="text-2xl font-bold mb-2">{frontmatter.title}</h2>
              <p className="text-gray-600">{frontmatter.date}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
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
