import React from "react";
import { useParams } from "react-router-dom";

export default function Navbar() {
  const { userId } = useParams();

  return (
    <div>
      User:
      <div>{userId}</div>
    </div>
  );
}
