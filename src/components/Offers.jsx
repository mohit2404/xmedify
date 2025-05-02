import { Offer1, Offer2 } from "../assets";

export default function OfferSection() {
  return (
    <section className="py-7">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-5">
          <img src={Offer1} alt="offer1" />
          <img src={Offer2} alt="offer2" />
          <img src={Offer1} alt="offer3" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="w-3 h-3 bg-gray-400 inline-block rounded-full"></span>
          <span className="w-3 h-3 bg-[#2AA8FF] inline-block rounded-full ring-1 ring-offset-4 ring-[#2AA8FF]"></span>
          <span className="w-3 h-3 bg-gray-400 inline-block rounded-full"></span>
        </div>
      </div>
    </section>
  );
}
