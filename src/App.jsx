import {useState} from "react";
import Creator from "./pages/Creator"
import Home from "./pages/Home"
import Insights from "./pages/Insights"
import Operator from "./pages/Operator";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Onboarding from "./pages/Onboarding";

const App = () => {
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [chatSession, setChatSession] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/creator"
          element={<Creator setCampaignDetails={setCampaignDetails} campaignDetails={campaignDetails} chatSession={chatSession} />}
        />
        <Route
          path="/insights"
          element={<Insights />}
        />
        <Route
          path="/operator"
          element={<Operator setCampaignDetails={setCampaignDetails} setChatSession={setChatSession} chatSession={chatSession} />}
        />
        <Route
          path="/onboarding"
          element={<Onboarding />}
        />
      </Routes>
    </Router>
);
};

export default App;