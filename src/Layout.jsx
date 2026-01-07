// Layout.jsx
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
