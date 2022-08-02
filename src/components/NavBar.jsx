import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function NavBar() {
  const { userId } = useContext(UserContext);
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div>
      <ul className="nav">
        {!userId
          ? (<><li>
              <Link
                className={url === "/login" ? "active link" : "link"}
                to="/login"
              >
                Login
              </Link>
            </li>
              <li>
                <Link
                  className={url === "/newuser" ? "active link" : "link"}
                  to="/newuser"
                >
                  Sign Up
                </Link>
              </li></>)
            
          : (<><li>
              <Link className={url === "/" ? "active link" : "link"} to="/">
                Home
              </Link>
            </li>
              <li>
                <Link
                  className={url === "/profile" ? "active link" : "link"}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              </>
            )}
      </ul>
    </div>
  );
}

