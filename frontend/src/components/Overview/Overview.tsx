import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "../../api/api";
import type { User } from "../../types/types";

export default function Overview() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: GetUsers,
  });
  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users.</p>;

  return (
    <>
      <div className="Container">
        {users && users.map((u: User) => <p key={u.id}>{u.fullName}</p>)}
      </div>
    </>
  );
}
