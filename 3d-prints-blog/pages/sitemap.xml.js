import fs from 'fs';
import path from 'path';

const generateSiteMap = (posts) => {
  // Укажите здесь домен вашего сайта
  const baseUrl = 'https://3dplp.vercel.app';

  // Статические страницы (главная, "обо мне" и т.д.)
  const staticPages = [
    '/',
    '/about'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
      .map((url) => {
        return `
        <url>
          <loc>${baseUrl}${url}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `;
      })
      .join('')}
  ${posts
      .map(({ slug, frontmatter }) => {
        return `
        <url>
          <loc>${baseUrl}/posts/${slug}</loc>
          <lastmod>${new Date(frontmatter.date).toISOString().split('T')[0]}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
      })
      .join('')}
</urlset>
`;

  return sitemap;
};

// Эта функция будет вызвана на стороне сервера при каждом запросе к /sitemap.xml
export async function getServerSideProps({ res }) {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const matter = require('gray-matter'); // gray-matter нужно импортировать здесь
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });

  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

// Компонент-пустышка, так как рендеринг происходит на стороне сервера
const Sitemap = () => null;

export default Sitemap;