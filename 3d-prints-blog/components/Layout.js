import Header from './Header';
import AdBlock from './AdBlock';

const Layout = ({ children }) => {
  return (
    <div className="
        flex flex-col min-h-screen
        bg-paper
        dark:bg-paper-dark
        text-ink-primary
        dark:text-ink-secondary">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* 
        Здесь мы вставляем рекламный блок. 
        Не забудьте заменить ca-pub-XXXXXXXXXXXXXXXX и YYYYYYYYYY на ваши реальные данные от AdSense.
      */}
      <div className="container mx-auto px-4">
        <AdBlock client="ca-pub-9677777917176715" slot="7325512253" />
      </div>
      <footer className="
          bg-surface-primary/50
          dark:bg-surface-primary-dark/50
          text-center p-4 mt-8 border-t
          border-frame-primary/50
          dark:border-frame-secondary/50">
        <p className="text-ink-primary/80 dark:text-ink-secondary/80">© {new Date().getFullYear()} 3D PLP Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;