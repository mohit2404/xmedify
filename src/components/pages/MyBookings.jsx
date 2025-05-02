import { useState, useEffect } from "react";
import { Icon } from "../../assets";
import DownloadSection from "../DownloadSection";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const normalized = storedBookings.map((booking) => {
      if (booking["Hospital Name"]) {
        return {
          "Hospital Name": booking["Hospital Name"],
          City: booking.City,
          State: booking.State,
          "Hospital Type": booking["Hospital Type"],
          "Hospital overall rating": booking["Hospital overall rating"],
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
        };
      }
      return booking;
    });

    if (JSON.stringify(storedBookings) !== JSON.stringify(normalized)) {
      localStorage.setItem("bookings", JSON.stringify(normalized));
    }

    setBookings(normalized);
    setFilteredBookings(normalized);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = bookings.filter((booking) =>
      booking["Hospital Name"]
        ?.toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#E7F0FF] to-[#E7F0FF] h-screen bg-red-500">
        <div className="bg-[#2AA8FF] rounded-b-2xl">
          <div className="relative container mx-auto flex items-center h-32">
            <h1 className="text-4xl text-white font-bold">My Bookings</h1>
            <div className="flex items-center absolute right-0 w-full max-w-3xl bg-white rounded-2xl top-18 p-6 gap-4">
              <div id="state" className="w-full">
                <input
                  type="text"
                  placeholder="Search by Hospital"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full h-12"
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-[#2AA8FF] text-white px-4 py-2 h-12 rounded-md cursor-pointer flex items-center gap-4"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="mt-20 max-w-4xl space-y-4">
            {filteredBookings.map((booking, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 flex gap-4">
                <div className="w-50">
                  <img src={Icon} alt="icon" className="w-48" />
                </div>
                <div className="w-full space-y-0.5">
                  <h3 className="text-[#2AA8FF] font-semibold tracking-wide text-lg">
                    {booking["Hospital Name"]}
                  </h3>
                  <p>
                    <strong>
                      {booking.City}, {booking.State}
                    </strong>
                  </p>
                  <p>
                    <strong className="text-[#01A400]"> FREE</strong>{" "}
                    Consultation fee at Clinic
                  </p>
                  <p>⭐ {booking["Hospital overall rating"] || "Not Rated"}</p>
                </div>
                <div className="w-full flex items-start gap-4">
                  <p className="p-2 px-5 rounded-md border border-[#2AA8FF] text-[#2AA8FF] cursor-pointer">
                    {booking.bookingTime}
                  </p>
                  <p className="p-2 px-5 rounded-md border border-[#01A400] text-[#01A400] cursor-pointer">
                    {booking.bookingDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <DownloadSection />
    </>
  );
}
