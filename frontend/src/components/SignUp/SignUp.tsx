import React, { useState } from "react";
import type { CreateUserPayload } from "../../types/types";
import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "../../api/api";
import { useNavigate } from "react-router";
export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("Customer");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newUser: CreateUserPayload) => CreateUser(newUser),
    onSuccess: () => {
      alert("User created successfully!");
      navigate("../Login");
    },
    onError: (e) => {
      console.error(e);
      alert("Something went wrong...");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: CreateUserPayload = {
        fullName,
        mobile,
        email,
        address,
        age: age === "" ? null : Number(age),
        type,
      };
      console.log("Submit payload", payload);
      mutation.mutate(payload);
    } catch (err) {
      console.error("Submit handler error:", err);
    }
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
      <h2 style={{ margin: 0, marginBottom: 12 }}>Create your Account</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label>
          <b>Full Name</b>
        </label>
        <input
          name="fullName"
          aria-label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>
          <b>Mobile</b>
        </label>
        <input
          name="mobile"
          aria-label="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label>
          <b>Email</b>
        </label>
        <input
          name="email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>
          <b>Address</b>
        </label>
        <input
          name="address"
          aria-label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>
          <b>Age</b>
        </label>
        <input
          name="age"
          aria-label="Age"
          type="number"
          // keep value as string to avoid controlled/uncontrolled type flips
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>
          <b>Type</b>
        </label>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Customer">Customer</option>
          <option value="Craftsmen">Craftsmen</option>
        </select>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
        >
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
