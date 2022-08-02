import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import UserContextProvider from "./components/UserContextProvider";
import PrivateRoute from "./components/PrivateRoute";



function App() {
 
  

  // function handleUserName(value) {
  //   setuserName(value);
  // }

  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={ <PrivateRoute ><Home  /></PrivateRoute>}
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute >
                <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/newuser"
              element={
                <NewUser/>
              }
            />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
