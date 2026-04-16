import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import RegistrationModal from '../components/modals/RegistrationModal';
import LoginModal from '../components/modals/LoginModal';
import ProfileModal from '../components/modals/ProfileModal';
import api from '../services/api';

const MainLayout = ({ user, setUser }) => {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoadingEnrollments, setIsLoadingEnrollments] = useState(false);

  useEffect(() => {
    if (user && isSidebarOpen) {
      const fetchEnrollments = async () => {
        setIsLoadingEnrollments(true);
        try {
          const response = await api.get('/enrollments');
          setEnrolledCourses(response.data.data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setUser(null);
            localStorage.removeItem('token');
            setIsLoginModalOpen(true);
            setIsSidebarOpen(false);
          }
        } finally {
          setIsLoadingEnrollments(false);
        }
      };

      fetchEnrollments();
    } else if (!user) {
      setEnrolledCourses([]);
    }
  }, [user, setUser, isSidebarOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        user={user} 
        onOpenRegistration={() => setIsRegModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      <main className="grow">
        <Outlet context={{ 
          openRegistration: () => setIsRegModalOpen(true),
          openLogin: () => setIsLoginModalOpen(true),
          openProfile: () => setIsProfileModalOpen(true),
          openSidebar: () => setIsSidebarOpen(true)
        }} />
      </main>

      <Footer
        onOpenSidebar={() => setIsSidebarOpen(true)}
        user={user}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        enrolledCourses={enrolledCourses}
        isLoadingEnrollments={isLoadingEnrollments} 
      />
      
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