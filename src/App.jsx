import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import MainLayout from "./layouts/MainLayout"
import api from "./services/api"
import Thumbnail from "./assets/Thumbnail.png"
import CourseCatalog from "./pages/CourseCatalog"

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("token") ? {} : null;
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/me");
          setUser(response.data.data);
        } catch (error) {
          if (error.response?.status === 401) {
            console.error("Unauthenticated:", error.response.data.message);
            localStorage.removeItem("token");
            setUser(null);
          } else {
            console.error("Failed to fetch user:", error);
          }
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout user={user} setUser={setUser} />}>
          <Route index element={<Homepage user={user}/>} />
          <Route path='catalog' element={<CourseCatalog user={user} />} />
        </Route>
          <Route path="*" element={<div className="w-screen h-screen flex flex-col items-center justify-center bg-white text-purple-900 type-heading-1 gap-10"><img src={Thumbnail} alt="Redberry Bootcamp XI" className="w-150" />Page Not Found</div>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
