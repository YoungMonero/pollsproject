import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPages/LoginPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./Context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 0 }}>
      <Routes>
        {/* Landing Page (Entry Point) */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-All (Optional) */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}
