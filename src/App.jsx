import React from "react";
import FlyerGenerator from "./pages/FlyerGeneration"
import Home from "./pages/Home"
import Insights from "./pages/Insights"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/flyer-generator"
          element={<FlyerGenerator />}
        />
        <Route
          path="/insights"
          element={<Insights />}
        />
      </Routes>
    </Router>
);
};

export default App;