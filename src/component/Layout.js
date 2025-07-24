import React from "react";
import Navbar from "../component/navbar";

const Layout = ({ children, user, handleLogout }) => (
  <>
    <Navbar user={user} handleLogout={handleLogout} />
    <main>{children}</main>
  </>
);

export default Layout;
