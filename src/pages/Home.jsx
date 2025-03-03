import { MarqueeDemo } from "../components/Marquee";

import { Hero } from "@/components/Hero.jsx";
import Product from "@/pages/Dashbord/Product.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <Product />
      <MarqueeDemo></MarqueeDemo>

    </>
  );
};

export default Home;
