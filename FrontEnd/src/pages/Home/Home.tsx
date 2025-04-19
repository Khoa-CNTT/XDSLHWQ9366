import { useEffect } from "react";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Banner from "./Banner/Banner";
import Subscribe from "./Subscribe/Subscribe";
import Category from "./Category/Category";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-16 w-full min-h-screen flex flex-col pb-1616">
      {/* Hero section */}
      <Hero />
      {/* Service section */}
      <div className="!-mt-16">
        <Services />
      </div>
      {/* Category section */}
      <Category />
      <Banner />
      <Subscribe />
    </div>
  );
};

export default Home;
