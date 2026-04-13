import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import MainLayout from "./layouts/MainLayout"

function App() {
  const user = null; // For test purposes

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout user={user} />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
