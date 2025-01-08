import React from "react";
import { UserAuth } from "../../assets/utils/Auth";

export const DashNav = () => {
  const { userSignOut, user } = UserAuth();
  const handleSignOut = async () => {
    try {
      await userSignOut();
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <>
      <h6 className='truncate text-base'>WELCOME, {user?.displayName}</h6>
      <button
        className='btn btn-error btn-soft btn-block'
        onClick={handleSignOut}
      >
        <span className='icon-[tabler--logout]'></span>
        Sign out
      </button>
      ;
    </>
  );
};
