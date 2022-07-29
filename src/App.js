import "./App.css";
import Home from "./Components/pages/Home/Home";
import Slider from "./Components/pages/Home/Slider/Slider";
import Navbar from "./Components/shared/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
          <div className="w-[95%] mx-auto">
            <Home />
          </div>
      </div>
    </>
  );
}

export default App;
