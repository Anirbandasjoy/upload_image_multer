import { model, Schema } from "mongoose";
import { IPlace } from "../types/imageupload.types";

const imageSchema = new Schema<IPlace>({
  place_name: {
    type: String,
    required: [true, "pleas_name is required"],
  },

  images: {
    type: [String],
    required: true,
  },
});

const Place = model<IPlace>("Place", imageSchema);

export default Place;
