import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./Components/Home";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Home></Home>
      <Toaster />
    </div>
  );
}

export default App;
