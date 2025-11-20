import "./App.css";
import Overview from "./components/Overview/Overview";
import MainLayout from "./components/MainLayout.tsx/MainLayout";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Overview />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
