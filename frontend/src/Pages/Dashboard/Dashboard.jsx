import React from "react";
import { useAuth } from "../../Context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome{user?.username ? `, ${user.username}` : ""} 🎉</h1>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default Dashboard;
