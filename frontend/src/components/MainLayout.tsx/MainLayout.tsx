import { useNavigate } from "react-router";
import { Outlet } from "react-router";
export default function MainLayout() {
  const navigate = useNavigate();
  return (
    <>
      {/* Header */}
      <header
        style={{
          display: "flex",
          background: "grey",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          width: "100%",
          boxSizing: "border-box",
          borderRadius: "10px",
        }}
      >
        <button style={{ overflowX: "hidden" }} onClick={() => navigate("/")}>
          Overview
        </button>
        <h1 style={{ margin: 0, textAlign: "center", color: "black", flex: 1 }}>
          FixItFast
        </h1>
        <button onClick={() => navigate("Login")}>Logout</button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
