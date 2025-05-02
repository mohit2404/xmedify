import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyBookings from "./components/pages/MyBookings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Centers from "./components/pages/Centers";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/centers" element={<Centers />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
