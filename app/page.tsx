import Image from "next/image";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import FetchPackagesComponent from "./_components/FetchPackagesComponent";
import CitySelection from "./_components/CitySelection";
import AdvertiseWithUs from "./_components/AdvertiseWithUs";
import AdvertisePackages from "./_components/AdvertisePackages";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CitySelection />
      <FetchPackagesComponent />
      <AdvertiseWithUs />
      <AdvertisePackages />
    </>
  );
}
