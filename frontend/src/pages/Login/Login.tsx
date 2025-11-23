import React, { useState } from "react";
import type { VerificationPayload } from "../../types/types";
import { Login } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuth } from "../../components/Authentication/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const mutation = useMutation({
    mutationFn: (payload: VerificationPayload) =>
      Login({
        email: payload.email.trim(),
        password: payload.password.trim(),
      }),
    onSuccess: (data) => {
      setAuth(data.user, data.token); // <--- store user & token in context
      alert("Successfully logged in");
      navigate("/");
    },
    onError: () => {
      alert("Email or password are wrong!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: VerificationPayload = { email, password };
    mutation.mutate(payload);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 600,
        background: "grey",
        margin: "50px auto",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?</p>{" "}
      <button
        style={{ maxWidth: "10vw", margin: "0 auto" }}
        onClick={() => navigate("../SignUp")}
      >
        Sign Up
      </button>
    </div>
  );
}
