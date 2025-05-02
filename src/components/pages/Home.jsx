import React from "react";
import LandingSection from "../LandingSection";
import OfferSection from "../Offers";
import Specials from "../Specials";
import Team from "../Team";
import ParentakCaring from "../Caring";
import Blogs from "../Blogs";
import Statistics from "../Stats";
import FaqSection from "../Faqs";
import DownloadSection from "../DownloadSection";

export default function Home() {
  return (
    <>
      <LandingSection />
      <OfferSection />
      <Specials />
      <Team />
      <ParentakCaring />
      <Blogs />
      <Statistics />
      <FaqSection />
      <DownloadSection />
    </>
  );
}
