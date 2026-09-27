import { Routes,Route,Navigate } from "react-router-dom"
import LogInPageComponent from "./pages/logIn"
import UserPage from "./pages/user"
import RegisterPageComponent from "./pages/register"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<LogInPageComponent />} />
        <Route path="/register" element={<RegisterPageComponent />}></Route>
        <Route path="/user/:id" element={<UserPage />}></Route>
      </Routes>
    </>
  )
}

export default App
