import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { AuthContextProvider } from "./assets/utils/Auth";
import { Protected } from "./assets/utils/Protected";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route
            path='/account'
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
