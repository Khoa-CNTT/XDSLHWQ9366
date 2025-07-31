import { useEffect, useState } from "react";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Banner from "./Banner/Banner";
import Subscribe from "./Subscribe/Subscribe";
import Chatbot from "../Chatbot/Chatbot";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading message="Loading home page..." />;
  }

  return (
    <div className="space-y-16 w-full min-h-screen flex flex-col pb-1616">
      {/* Hero section */}
      <Hero />
      {/* Service section */}
      <div className="!-mt-16">
        <Services />
      </div>
      <Banner />
      <Subscribe />
      <Chatbot />
    </div>
  );
};

export default Home;
