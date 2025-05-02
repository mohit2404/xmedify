import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Ambulance,
  Banner,
  Doctors,
  Hospitals,
  Labs,
  MedicalStores,
} from "../assets";

export default function LandingSection() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedstate, setSelectedstate] = useState("");
  const [selectedcity, setSelectedcity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    const fetchstates = async () => {
      try {
        const res = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );
        //console.log(res);
        setStates(res.data);
        setSelectedstate("");
        setCities([]);
        setSelectedcity("");
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
          //console.log(res);
          setCities(res.data);
          setSelectedcity("");
          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setloading(false);
        }
      }
    };
    fetchcities();
  }, [selectedstate]);

  const handleFindCenters = async () => {
    if (selectedstate && selectedcity) {
      navigate(`/centers?state=${selectedstate}&city=${selectedcity}`);
    }
  };

  return (
    <section className="h-screen bg-gradient-to-r from-[#E7F0FF] to-[#E7F0FF] pt-4 mb-20">
      <div className="container mx-auto relative">
        <div className="flex justify-between h-screen">
          <div className="mt-16">
            <h2 className="">
              <span className="text-xl font-semibold tracking-wide">
                Skip the travel! Find Online
              </span>{" "}
              <br />
              <strong className="text-5xl">
                Medical
                <span style={{ color: "#2AA8FF" }}> Centers</span>
              </strong>
            </h2>
            <h3 className="mt-4 text-gray-500 text-lg">
              Connect instantly with a 24x7 specialist or choose to <br />
              video visit a particular doctor.
            </h3>
            <button
              className="mt-4 bg-[#2AA8FF] text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={() => navigate("/centers")}
            >
              Find Centers
            </button>
          </div>
          <div>
            <img src={Banner} alt="hero section" width={585} />
          </div>
        </div>
        <div className="bg-white p-6 absolute w-full -bottom-9 rounded-2xl h-[360px] shadow-lg">
          <div className="flex items-center justify-center gap-x-4 w-full my-4">
            <div className="relative">
              <div id="state" onClick={() => setIsOpen(true)}>
                <input
                  type="search"
                  value={selectedstate}
                  readOnly
                  placeholder="State"
                  className="h-12 border border-gray-300 rounded-md p-4 cursor-pointer"
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

            <div className="relative">
              <div id="city" onClick={() => setIsOpen2(true)}>
                <input
                  type="search"
                  value={selectedcity}
                  readOnly
                  placeholder="City"
                  className="h-12 border border-gray-300 rounded p-4 cursor-pointer"
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
              className="h-12 px-7 rounded-md bg-[#2AA8FF] text-white cursor-pointer"
              type="submit"
              onClick={handleFindCenters}
            >
              Search
            </button>
          </div>

          <div>
            <p className="text-center my-7 font-semibold">
              You may be looking for
            </p>
            <div className="flex items-center gap-4 w-full justify-evenly">
              <img src={Ambulance} alt="" className="bg-white" />
              <img src={Doctors} alt="" className="bg-white" />
              <img src={Hospitals} alt="" className="bg-white" />
              <img src={Labs} alt="" className="bg-white" />
              <img src={MedicalStores} alt="" className="bg-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
