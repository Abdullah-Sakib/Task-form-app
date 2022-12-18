import React, { useEffect, useState } from "react";

const Home = () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getOptions")
      .then((res) => res.json())
      .then((data) => setOptions(data));
  }, []);
  console.log(options);
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h2>

        <form className="text-lg">
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-yellow-400 focus:ring-yellow-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="selectors"
              >
                Sectors
              </label>
              <select
                id="selectors"
                multiple
                size={5}
                className="select select-warning w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-yellow-400 focus:ring-yellow-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                {options?.map((option) => (
                  <option
                    value={option._id}
                    key={option._id}
                    className="text-lg my-1"
                  >
                    {option?.option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="cursor-pointer label justify-start">
                <input type="checkbox" className="checkbox checkbox-warning border-[3px]" />
                <span className=" text-gray-700 dark:text-gray-200 ml-3">
                  Agree to terms
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-warning rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Home;
