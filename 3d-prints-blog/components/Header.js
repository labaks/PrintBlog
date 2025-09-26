import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="
          backdrop-blur-lg sticky top-0 z-10 border-b 
          bg-surface-primary/80
          border-frame-primary
          dark:bg-surface-primary-dark/80
          dark:border-frame-secondary
        ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="
                              text-2xl font-bold
                              text-ink-primary
                              hover:text-ink-accent
                              dark:text-ink-secondary
                              dark:hover:text-ink-accent-dark
                              transition-colors">
          <Image
            src="/logo.png"
            alt="3D PLP"
            width={64}
            height={64}
            className="inline mr-2 align-middle" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="
                                px-4 py-2 rounded-md transition-colors
                                text-ink-primary/90
                                hover:text-ink-accent
                                dark:text-ink-secondary/90
                                dark:hover:text-ink-accent-dark">
            Главная
          </Link>
          {/* Здесь можно будет добавить другие ссылки, например, "Обо мне" */}
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;