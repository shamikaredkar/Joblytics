import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "./Auth";

export const Protected = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
  return <div>Protected</div>;
};
