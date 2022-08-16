import React from "react";
// Same as head element in HTML, an element above the body that gives metadata about site
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

// This component will be used in _app.js in order to better format the website
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Test E-commerce Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
