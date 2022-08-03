import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import Button from "react-bootstrap/Button";



export default function NavBar() {
  const { userId,signout} = useUser();
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
            {userId &&( <Button variant="primary" className="btn ms-auto" onClick={signout}>Log out</Button> )}
      </ul>
      
    </div>
  );
}



