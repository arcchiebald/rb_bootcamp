import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import MainLayout from "./layouts/MainLayout"
import api from "./services/api"

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
          } else {
            console.error("Failed to fetch user:", error);
          }
          localStorage.removeItem("token");
          setUser(null);
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
