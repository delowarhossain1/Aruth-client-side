import "./App.css";
import Slider from "./Components/pages/Home/Slider";
import Navbar from "./Components/shared/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-300">
          <Slider />
      </div>
    </>
  );
}

export default App;
