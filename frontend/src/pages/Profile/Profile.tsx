import { useEffect, useState } from "react";
import type { User } from "../../types/types";
import { useAuth } from "../../components/Authentication/useAuth";
import { GetProfile } from "../../api/api";
import { useNavigate } from "react-router";

export default function Profile() {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    GetProfile(token)
      .then((data) => setProfile(data))
      .catch(() => {
        logout();
        navigate("/login");
      });
  }, [token, logout, navigate]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <p>Name: {profile.fullName}</p>
      <p>Email: {profile.email}</p>
      <p>Address: {profile.address}</p>
      <p>Mobile: {profile.mobile}</p>
      <p>Age: {profile.age}</p>
      <p>Type: {profile.type}</p>
    </div>
  );
}
