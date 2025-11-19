import { useState } from "react";
import "./App.css";

type User = {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  age: number;
  type: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const usersArr = await response.json();
    setUsers(usersArr);
  };
  return (
    <>
      <div>
        <button onClick={() => fetchUsers()}>FetchUsers</button>
        {users && users.map((u) => <p key={u.id}>{u.fullName}</p>)}
      </div>
    </>
  );
}

export default App;
