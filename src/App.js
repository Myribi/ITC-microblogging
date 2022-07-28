import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [userName, setuserName] = useLocalStorage("Myriam","");
  
  function handleUserName(value) {
    setuserName(value);
  }

  return (
    <>
      
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<Home userName={userName} setuserName={setuserName} />}
            />
            <Route
              path="/profile"
              element={
                <Profile userName={userName} setuserName={handleUserName} />
              }
            />
          </Routes>
        </BrowserRouter>
     
    </>
  );
}

export default App;
