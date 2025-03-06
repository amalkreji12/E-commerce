import React from "react";
import Hero from "../components/Hero/Hero";
import LatestCollection from "../components/LatestCollection/LatestCollection";
import Bestseller from "../components/Bestseller/Bestseller";
import Policy from "../components/Policy/Policy";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Bestseller />
      <Policy />
    </div>
  );
};

export default Home;
