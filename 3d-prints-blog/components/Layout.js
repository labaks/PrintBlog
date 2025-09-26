import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink-primary">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-surface-primary/50 text-center p-4 mt-8 border-t border-frame-primary/50">
        <p className="text-ink-primary/80">© {new Date().getFullYear()} 3D Prints Blog. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Layout;