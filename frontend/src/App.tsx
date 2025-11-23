import "./App.css";
import Overview from "./pages/Overview/Overview";
import MainLayout from "./pages/MainLayout.tsx/MainLayout";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Overview />} />
            <Route path="/Profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
