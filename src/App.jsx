import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { AuthContextProvider, UserAuth } from "./assets/utils/Auth";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/account' element={<Dashboard />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
