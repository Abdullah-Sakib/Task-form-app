import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Context";

const EditPage = () => {
  const { user } = useContext(UserContext);
  const [storedData, setStoredData] = useState({});
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/getSavedData?name=${user?.name}`)
      .then((res) => res.json())
      .then((data) => setStoredData(data));
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:5000/getSectors")
      .then((res) => res.json())
      .then((data) => setSectors(data));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const sector = form.sector.value;
    const agree = form.agree.checked;

    if (name.length === 0) {
      toast.error("Please provide your name");
      return;
    } else if (sector.length === 0) {
      toast.error("Please select the sector you are currently involved in.");
      return;
    } else if (agree === false) {
      toast.error("Sorry, You must agree our terms to continue.");
      return;
    }

    const data = {
      name,
      sector,
      agree,
    };

    fetch(`http://localhost:5000/updateData?name=${user?.name}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 409) {
          toast.error("Please try another name. This name has already taken");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0 || data.acknowledged) {
          toast.success("Congratulations! Your data updated successfully");
        }
      });
  };
  
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white ">
          Update your information. Update your information. Update your
          information.
        </h2>

        <form className="text-lg" onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={storedData?.name}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-yellow-400 focus:ring-yellow-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="sectors"
              >
                Sectors
              </label>
              <select
                id="sectors"
                name="sector"
                defaultValue={storedData.sector}
                className="select text-base h-10 select-warning w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-yellow-400 focus:ring-yellow-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                {sectors?.map((sector) => (
                  <option
                    value={sector?.option}
                    key={sector?._id}
                    className="text-lg my-1"
                  >
                    {sector?.option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="cursor-pointer label justify-start">
                <input
                  name="agree"
                  defaultChecked={storedData?.agree}
                  type="checkbox"
                  className="checkbox checkbox-warning border-[3px]"
                />
                <span className=" text-gray-700 dark:text-gray-200 ml-3">
                  Agree to terms
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Link to="/">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-warning rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600 mr-3">
                Back
              </button>
            </Link>
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-warning rounded-md hover:bg-yellow-500 focus:outline-none ">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditPage;
