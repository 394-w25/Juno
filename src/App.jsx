import { useState } from "react";
import Creator from "./pages/Creator";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import Operator from "./pages/Operator";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Login from "./components/Login";
import LoadingScreen from "./components/Loading";
import AuthProvider, { useAuth } from "./services/auth";

const App = () => {
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [chatSession, setChatSession] = useState(null);

  const PrivateRoute = ({ children }) => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
      return <LoadingScreen text={"Loading..."} />;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  const PublicRoute = ({ children }) => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
      return <LoadingScreen text={"Loading..."} />;
    }

    return !user ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
                path="/onboarding"
                element={<Onboarding />}
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/creator"
            element={
              <PublicRoute>
                <Creator
                  setCampaignDetails={setCampaignDetails}
                  campaignDetails={campaignDetails}
                  chatSession={chatSession}
                />
              </PublicRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <PublicRoute>
                <Insights />
              </PublicRoute>
            }
          />
          <Route
            path="/operator"
            element={
              <PublicRoute>
                <Operator
                  setCampaignDetails={setCampaignDetails}
                  setChatSession={setChatSession}
                  chatSession={chatSession}
                />
              </PublicRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
