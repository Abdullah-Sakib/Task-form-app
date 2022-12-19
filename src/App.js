import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import EditPage from "./Components/EditPage";
import Home from "./Components/Home";
import PrivetRoute from "./Components/PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "edit",
    element: <PrivetRoute><EditPage></EditPage></PrivetRoute>,
  },
]);

function App() {
  return (
    <div >
      <RouterProvider router={router}>
        <Home />
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
