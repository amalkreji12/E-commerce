import React from "react";
import Hero from "../components/Hero/Hero";
import LatestCollection from "../components/LatestCollection/LatestCollection";
import Bestseller from "../components/Bestseller/Bestseller";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Bestseller />
    </div>
  );
};

export default Home;
