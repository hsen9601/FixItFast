import React, { useState } from "react";
import type { LoginPayload } from "../../types/types";
import { Login } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => Login(payload),
    onSuccess: () => {
      alert("Login was successful!");
      navigate("../");
    },
    onError: (e) => {
      console.error(e);
      alert("Something went wrong...");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: LoginPayload = {
        email,
        password,
      };
      console.log("Submit payload", payload);
      mutation.mutate(payload);
    } catch (err) {
      console.error("Submit handler error:", err);
    }
  };

  return (
    <>
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
        <h2 style={{ margin: 0, marginBottom: 12 }}>Create your Account</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <label>
            <b>Email</b>
          </label>
          <input
            name="email"
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>
            <b>Password</b>
          </label>
          <input
            name="password"
            aria-label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <button type="submit">Login</button>
          </div>
        </form>

        <p>Got no Account?</p>
        <button onClick={() => navigate("../SignUp")}>SignUp</button>
      </div>
    </>
  );
}
