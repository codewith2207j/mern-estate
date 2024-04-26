import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    regularPrice: {
      type: Number,
      require: true,
    },
    discountedPrice: {
      type: Number,
      require: true,
    },
    bathRoom: {
      type: Number,
      require: true,
    },
    bedRooms: {
      type: Number,
      require: true,
    },
    furnished: {
      type: Boolean,
      require: true,
    },
    parking: {
      type: Boolean,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    offer: {
      type: Boolean,
      require: true,
    },
    imageUrls: {
      type: Array,
      require: true,
    },
    userRef: {
      type: String,
      require: true,
    },
  },
  { timestamp: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;