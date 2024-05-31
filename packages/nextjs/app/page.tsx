"use client";

import React from "react";
import ReadmePage from "../components/ReadmePage";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="w-1/2 my-10">
        <ReadmePage />
      </div>
    </div>
  );
};

export default Home;
