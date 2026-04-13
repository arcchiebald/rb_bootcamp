import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // შენი ჰედერი
import Footer from '../components/Footer';

const MainLayout = ({ user }) => {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;