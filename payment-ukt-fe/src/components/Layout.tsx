import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {children}        
      </main>
    </div>
  );
}

export default Layout;