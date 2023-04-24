import React, { useState } from "react";
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./MainContent";

function App() {

    return (
      <div className="flex flex-col min-h-screen bg-gray-800 text-white">
        <Header />
        <MainContent />
        <Footer />
      </div>
    );
  }
  

export default App;
