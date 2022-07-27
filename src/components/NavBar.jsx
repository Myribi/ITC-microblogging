import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";



export default function NavBar() {
    const location = useLocation(); 
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
    return (

    <div>
        <ul className="nav">
        <li ><Link className={(url === "/" ?"active link" : "link")} to="/" >Home</Link></li>
        <li ><Link className={(url === "/profile" ?"active link" : "link")} to="/profile" >Profile</Link></li>
        </ul>
    </div>
    )
}