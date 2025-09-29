import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  return (
    <>
      <Head>
        <title>About Me | 3D PLP Blog</title>
        <meta name="description" content="Information about the author of the 3D PLP Blog" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-surface-primary dark:bg-surface-primary-dark p-8 rounded-lg shadow-md">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold mb-4 text-ink-primary dark:text-ink-secondary text-center">
            Hello!
          </h1>
          <p className="text-lg text-ink-primary/90 dark:text-ink-secondary/90 mb-8 text-center">
            I'm the author of this blog and I'm passionate about 3D printing. Here I share the models I've printed and my experiences. Thanks for stopping by!
          </p>

          <div className="border-t border-frame-primary/50 dark:border-frame-secondary/50 my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-ink-primary dark:text-ink-secondary">Follow Me</h2>
              <div className="flex flex-col space-y-4">
                <Link href="https://www.youtube.com/@pretty.little.prints" className="flex items-center gap-3 text-ink-primary/80 hover:text-ink-accent dark:text-ink-secondary/80 dark:hover:text-ink-accent-dark transition-colors">
                  <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
                  <span>YouTube</span>
                </Link>
                <Link href="https://www.tiktok.com/@_pretty.little.prints._" className="flex items-center gap-3 text-ink-primary/80 hover:text-ink-accent dark:text-ink-secondary/80 dark:hover:text-ink-accent-dark transition-colors">
                  <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
                  <span>TikTok</span>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-ink-primary dark:text-ink-secondary">My 3D Models</h2>
              <div className="flex flex-col space-y-4">
                <Link href="https://makerworld.com/en/@Labax" className="flex items-center gap-3 text-ink-primary/80 hover:text-ink-accent dark:text-ink-secondary/80 dark:hover:text-ink-accent-dark transition-colors">
                  <Image src="/images/icons/makerworld.png" alt="MakerWorld" width={24} height={24} />
                  <span>MakerWorld</span>
                </Link>
                <Link href="https://www.printables.com/@labax_1847186" className="flex items-center gap-3 text-ink-primary/80 hover:text-ink-accent dark:text-ink-secondary/80 dark:hover:text-ink-accent-dark transition-colors">
                  <Image src="/images/icons/printables.png" alt="Printables" width={24} height={24} />
                  <span>Printables</span>
                </Link>
                {/* Add other platforms similarly */}
              </div>
            </div>
          </div>

          <div className="border-t border-frame-primary/50 dark:border-frame-secondary/50 my-8"></div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-ink-primary dark:text-ink-secondary text-center">Contact Me</h2>
            <a href="mailto:pretty.little.prints000@gmail.com" className="flex items-center justify-center gap-3 text-lg text-ink-primary/80 hover:text-ink-accent dark:text-ink-secondary/80 dark:hover:text-ink-accent-dark transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
              <span>pretty.little.prints000@gmail.com</span>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}