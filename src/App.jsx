import { BrowserRouter, Routes, Route } from "react-router-dom"
import Test from "./pages/Test"

function App() {
  return (
    <BrowserRouter>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </BrowserRouter>
  )
}

export default App
