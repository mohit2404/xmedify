import { useState, useEffect } from "react";
// import styles from "./Homepage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Icon } from "../../assets";

export default function Centers() {
  const navigate = useNavigate();
  const location = useLocation();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [center, setCenter] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedstate, setSelectedstate] = useState("");
  const [selectedcity, setSelectedcity] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [activeCalendarIndex, setActiveCalendarIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    console.log(location);

    const state = params.get("state");
    const city = params.get("city");
    setSelectedstate(state);
    setSelectedcity(city);
  }, []);

  useEffect(() => {
    const fetchstates = async () => {
      try {
        const res = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );

        setStates(res.data);
        // setSelectedstate("");
        setCities([]);
        // setSelectedcity("");
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    };
    fetchstates();
  }, []);

  useEffect(() => {
    const fetchcities = async () => {
      if (selectedstate) {
        try {
          const res = await axios.get(
            `https://meddata-backend.onrender.com/cities/${selectedstate}`
          );

          setCities(res.data);
          // setSelectedcity("");

          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setloading(false);
        }
      }
    };
    fetchcities();
  }, [selectedstate]);

  useEffect(() => {
    handleFindCenters();
  }, [location, selectedstate, selectedcity]);

  const handleFindCenters = async () => {
    if (selectedstate && selectedcity) {
      try {
        const res = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${selectedstate}&city=${selectedcity}`
        );
        console.log("Fetched centers:", res.data);
        setCenter(res.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    }
  };

  const availableDates = [...Array(7)].map((_, i) => {
    //get 7 dates array
    const date = new Date();
    date.setDate(date.getDate() + i); // local date today then + 1
    return date.toISOString().split("T")[0]; // return only dates not time
  });

  const handleBookClick = (centerData, index) => {
    setSelectedCenter(centerData);
    setActiveCalendarIndex(true);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setActiveCalendarIndex((prev) => (prev === index ? null : index)); // open only 1 calender for 1 center at a time
  };

  const handleConfirmBooking = () => {
    if (!selectedCenter || !selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    const booking = {
      "Hospital Name": selectedCenter["Hospital Name"],
      City: selectedCenter.City,
      State: selectedCenter.State,
      "Hospital Type": selectedCenter["Hospital Type"],
      "Hospital overall rating": selectedCenter["Hospital overall rating"],
      bookingDate: selectedDate,
      bookingTime: selectedTimeSlot,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(booking); // Add the new booking

    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    alert("Booking confirmed!");
    setActiveCalendarIndex(false);
    navigate("/my-bookings");
  };

  return (
    <section className="bg-gradient-to-r from-[#E7F0FF] to-[#E7F0FF] min-h-screen h-fit pb-20 bg-red-500">
      <div className="bg-[#2AA8FF] mb-20 rounded-b-2xl relative h-32 grid place-items-center">
        <div className="container mx-auto p-7 flex items-center gap-4 bg-white shadow-lg rounded-2xl absolute top-18">
          <div className="relative w-full">
            <div id="state" onClick={() => setIsOpen(true)}>
              <input
                type="search"
                value={selectedstate}
                readOnly
                placeholder="State"
                className="h-12 border w-full border-gray-300 rounded-md p-4 cursor-pointer"
              />
            </div>
            {isOpen && (
              <ul
                id="stateDropDown"
                className="bg-white absolute top-12 left-0 z-10 overflow-y-scroll border border-gray-300 rounded-md h-[200px] w-full"
              >
                {states.map((state, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedstate(state);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer py-1 px-2"
                  >
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full">
            <div id="city" onClick={() => setIsOpen2(true)}>
              <input
                type="search"
                value={selectedcity}
                readOnly
                placeholder="City"
                className="h-12 border w-full border-gray-300 rounded p-4 cursor-pointer"
              />
            </div>
            {isOpen2 && (
              <ul
                id="cityDropDown"
                className="bg-white absolute top-12 left-0 z-10 overflow-y-scroll border border-gray-300 rounded-md h-[200px] w-full"
              >
                {cities.map((city, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedcity(city);
                      setIsOpen2(false);
                    }}
                    className="cursor-pointer py-1 px-2"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleFindCenters}
            className="bg-[#2AA8FF] text-white px-7 py-2 h-12 rounded-md cursor-pointer flex items-center gap-4"
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

      <div className="container mx-auto">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold tracking-wide">
            {center.length} medical centers available in{" "}
            {selectedcity.toLowerCase()}
          </h1>
          <p className="text-[#787887] flex gap-1">
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
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Book appointments with minimum wait-time & verified doctor details
          </p>
        </div>

        <div className="mt-5 max-w-4xl space-y-4">
          {center.length > 0 ? (
            center.map((c, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <div className="flex justify-between gap-4">
                  <div className="w-50">
                    <img src={Icon} alt="icon" className="w-50" />
                  </div>
                  <div className="w-full space-y-0.5">
                    <h3 className="text-[#2AA8FF] font-semibold tracking-wide text-lg">
                      {c["Hospital Name"]}
                    </h3>
                    <p>
                      <strong>
                        {c.City}, {c.State}
                      </strong>
                    </p>
                    <p>
                      <strong className="text-[#01A400]">FREE</strong>{" "}
                      Consultation fee at Clinic
                    </p>
                    <p>⭐ {c["Hospital overall rating"] || "Not Rated"}</p>
                  </div>

                  <div className="w-fit flex flex-col items-center justify-end">
                    <p className="text-[#01A400] font-semibold tracking-wide mb-4">
                      Available Today
                    </p>
                    <button
                      onClick={() => handleBookClick(c, index)}
                      className="bg-[#2AA8FF] text-white px-7 p-2 whitespace-nowrap rounded-md inline-block"
                    >
                      Book FREE Center Visit
                    </button>
                  </div>
                </div>

                {activeCalendarIndex === index && (
                  <div className="border border-gray-300 p-4 mt-4 rounded-xl">
                    <div className="flex gap-4 overflow-x-scroll hide-scrollbar mb-2">
                      {availableDates.map((date, idx) => {
                        const label =
                          idx === 0
                            ? "Today"
                            : idx === 1
                            ? "Tomorrow"
                            : new Date(date).toLocaleDateString("en-US", {
                                weekday: "long",
                              });

                        const slotsAvailable =
                          Math.floor(Math.random() * 15) + 1;

                        return (
                          <div
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`${
                              selectedDate === date
                                ? "bg-[#2AA8FF]"
                                : "bg-white"
                            } text-center min-w-40 border border-gray-300 gap-2.5 rounded-md p-2 cursor-pointer`}
                          >
                            <p>
                              <strong>{label}</strong>
                            </p>
                            <p style={{ color: "#01A400" }}>
                              {slotsAvailable} Slots Available
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {[
                      { label: "Morning", slots: ["10:00 AM", "11:00 AM"] },
                      {
                        label: "Afternoon",
                        slots: ["12:00 PM", "1:00 PM", "3:00 PM"],
                      },
                      { label: "Evening", slots: ["5:00 PM", "6:00 PM"] },
                    ].map((group) => (
                      <div key={group.label} className="my-2.5">
                        <p className="font-semibold">{group.label}</p>
                        <div className="flex items-center gap-2.5 mt-1">
                          {group.slots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`${
                                selectedTimeSlot === slot
                                  ? "bg-[#2AA8FF]"
                                  : "bg-white"
                              } text-center min-w-fit px-2.5 border border-gray-300 gap-2.5 rounded-md p-2 cursor-pointer`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {selectedDate && selectedTimeSlot && (
                      <>
                        <p className="mt-4">
                          ✅ Booking Confirmed for{" "}
                          <strong>{selectedDate}</strong> at{" "}
                          <strong>{selectedTimeSlot}</strong>
                        </p>
                        <button
                          onClick={handleConfirmBooking}
                          className="bg-[#2AA8FF] mt-2 text-white px-7 py-2 h-12 rounded-md cursor-pointer flex items-center gap-4"
                        >
                          Confirm Booking
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p style={{ marginLeft: "400px" }}>You may be looking for</p>
          )}
        </div>
      </div>
    </section>
  );
}
