import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateListing() {
  const [listing, setListing] = useState([]);
  const [formData, setFormData] = useState({});
  const fetchListing = async () => {
    const data = await axios.post("/create", formData);
  };
  useEffect(() => {
    fetchListing();
  }, []);
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center m-7">Create Listing</h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1 mr-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            id="description"
            placeholder="Description"
            required
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            className="border p-3 rounded-lg"
          />
          <div className="flex flex-row gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Bedroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bath"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="0"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">$/month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">$/month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 ml-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex flex-col flex-1 gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:shadow-lg disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
