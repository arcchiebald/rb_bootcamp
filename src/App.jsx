import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import MainLayout from "./layouts/MainLayout"

function App() {
  const user = {'courses': 'John Doe'}; // For test purposes
  // const user = null; // No user logged in

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout user={user} />}>
          <Route index element={<Homepage user={user}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
