import { useNavigate } from "react-router-dom";
import { Logo } from "../assets/index";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full text-sm">
      <div className="h-10 bg-[#2AA7FF] text-white text-center p-2">
        <div className="container mx-auto">
          <p>
            The health and well-being of our patients and their health care team
            will always be our priority, so we follow the best practices for
            cleanliness.
          </p>
        </div>
      </div>

      <nav className="container mx-auto flex justify-between items-center h-24">
        <a href="">
          <img src={Logo} alt="logo" />
        </a>
        <div className="space-x-7">
          <a href="#" className="font-semibold text-[#2AA7FF] border-b-2">
            Find Doctors
          </a>
          <a href="#">Hospitals</a>
          <a href="#">Medicines</a>
          <a href="#">Surgeries</a>
          <a href="#">Software for Provider</a>
          <a href="#">Facilites</a>
          <button
            className="bg-[#2AA7FF] text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate("my-bookings")}
          >
            My Bookings
          </button>
        </div>
      </nav>
    </header>
  );
}
