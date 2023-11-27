import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  let userId = 123;
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={`/users/${userId}`}>User</Link>
      </li>
    </div>
  );
}
