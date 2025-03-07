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
import AuthProvider, { useAuthContext } from "./components/AuthContext";
import { ChatSession } from "@google/generative-ai";
import { CampaignDetail } from "./gemini/GeminiFunctions";

const App = () => {

  /** @type {[CampaignDetail | null, React.Dispatch<React.SetStateAction<CampaignDetail | null>>]} */
  const [campaignDetails, setCampaignDetails] = useState(null);

  /** @type {[ChatSession | null, React.Dispatch<React.SetStateAction<ChatSession | null>>]} */
  const [chatSession, setChatSession] = useState(null);

  const PrivateRoute = ({ children }) => {
    const { user, authLoading } = useAuthContext();

    if (authLoading) {
      return <LoadingScreen text={"Loading..."} />;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
                path="/onboarding"
                element={
                  <PrivateRoute>
                    <Onboarding />
                  </PrivateRoute>
              }
          />
          <Route
            path="/login"
            element={
              <Login />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/creator"
            element={
              <PrivateRoute>
                <Creator
                  campaignDetails={campaignDetails}
                  chatSession={chatSession}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <PrivateRoute>
                <Insights />
              </PrivateRoute>
            }
          />
          <Route
            path="/operator"
            element={
              <PrivateRoute>
                <Operator
                  setCampaignDetails={setCampaignDetails}
                  setChatSession={setChatSession}
                  chatSession={chatSession}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
