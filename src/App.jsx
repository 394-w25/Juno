import React from "react";
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/creator"
          element={<Creator />}
        />
        <Route
          path="/insights"
          element={<Insights />}
        />
        <Route
          path="/operator"
          element={<Operator />}
        />
      </Routes>
    </Router>
);
};

export default App;