import { MarqueeDemo } from "../components/Marquee";
import { IconCloudDemo } from "@/components/IconCloud.jsx";
import { Hero } from "@/components/Hero.jsx";
import { Feature } from "@/components/Home/Feature.jsx";
import { OrbitingCirclesDemo } from "@/components/circles.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <Feature></Feature>
      <MarqueeDemo></MarqueeDemo>
     
    </>
  );
};

export default Home;
