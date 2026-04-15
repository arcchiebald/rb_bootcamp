import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationModal from '../components/modals/RegistrationModal';
import LoginModal from '../components/modals/LoginModal';
import ProfileModal from '../components/modals/ProfileModal';

const MainLayout = ({ user, setUser }) => {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        user={user} 
        onOpenRegistration={() => setIsRegModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      <main className="grow">
        <Outlet context={{ 
          openRegistration: () => setIsRegModalOpen(true),
          openLogin: () => setIsLoginModalOpen(true),
          openProfile: () => setIsProfileModalOpen(true)
        }} />
      </main>

      <Footer />
      
      <RegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={() => setIsRegModalOpen(false)}
        setUser={setUser}
        onOpenLogin={() => {
          setIsRegModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        setUser={setUser}
        onOpenRegistration={() => {
          setIsLoginModalOpen(false);
          setIsRegModalOpen(true);
        }}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default MainLayout;