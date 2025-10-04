import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faFaceFrownOpen } from '@fortawesome/free-regular-svg-icons';
import AdBlock from '../../components/AdBlock';

export default function PostPage({ frontmatter: { title, date, image, authorname, authorlink, link, source, youtube, tiktok }, content }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{title} | 3D PLP Blog</title>
      </Head>

      <article className="max-w-3xl mx-auto bg-surface-primary dark:bg-surface-primary-dark p-5 rounded-lg shadow-md">
        {image && (
          <div className="flex justify-center mb-4">
            <Image
              src={image}
              alt={title}
              width={450}
              height={450}
              className="object-cover aspect-square rounded-lg"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2 text-ink-primary dark:text-ink-secondary">{title}</h1>
        <p className="text-ink-primary/70 dark:text-ink-secondary/70 mb-2 text-right">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        {authorname && (
          <Link href={authorlink} className="text-ink-primary/80 dark:text-ink-secondary/80 mb-1 font-bold">Author: {authorname}</Link>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="w-full sm:w-auto">
            {source === 'makerworld' && (
              <Link href={link} className="flex items-center justify-center sm:justify-start gap-2 text-ink-accent dark:text-ink-accent-dark download-link makerworld-link">
                <Image src="/images/icons/makerworld.png" alt="MakerWorld" width={30} height={30} /> Download from MakerWorld
              </Link>
            )}
            {source === 'thingiverse' && (
              <Link href={link} className="flex items-center justify-center sm:justify-start gap-2 text-ink-accent dark:text-ink-accent-dark download-link thingiverse-link">
                <Image src="/images/icons/thingiverse.png" alt="Thingiverse" width={30} height={30} /> Download from Thingiverse
              </Link>
            )}
            {source === 'printables' && (
              <Link href={link} className="flex items-center justify-center sm:justify-start gap-2 text-ink-accent dark:text-ink-accent-dark download-link printables-link">
                <Image src="/images/icons/printables.png" alt="Printables" width={30} height={30} /> Download from Printables
              </Link>
            )}
            {source === 'thangs' && (
              <Link href={link} className="flex items-center justify-center sm:justify-start gap-2 text-ink-accent dark:text-ink-accent-dark download-link thangs-link">
                <Image src="/images/icons/thangs.png" alt="Thangs" width={30} height={30} /> Download from Thangs
              </Link>
            )}
            {source === 'cults' && (
              <Link href={link} className="flex items-center justify-center sm:justify-start gap-2 text-ink-accent dark:text-ink-accent-dark download-link cults-link">
                <Image src="/images/icons/cults.png" alt="Cults3D" width={30} height={30} /> Download from Cults3D
              </Link>
            )}
            {source === 'none' && (
              <span className="flex items-center justify-center sm:justify-start gap-2 text-ink-primary/70 dark:text-ink-secondary/70 download-link unavailable-link">
                <FontAwesomeIcon icon={faFaceFrownOpen} className="w-8 h-8" /> Model is unavailable for download
              </span>
            )}
          </div>
          <div className="flex justify-center gap-4 sm:ml-auto">
            <Link href={youtube} className="flex flex-1 items-center justify-center gap-2 text-ink-accent dark:text-ink-accent-dark youtube-link">
              <FontAwesomeIcon icon={faYoutube} className="w-9 h-9" /> YouTube
            </Link>
            <Link href={tiktok} className="flex flex-1 items-center justify-center gap-2 text-ink-accent dark:text-ink-accent-dark tiktok-link">
              <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" /> TikTok
            </Link>
          </div>
        </div>


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
        <AdBlock client="ca-pub-9677777917176715" slot="7325512253" />
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