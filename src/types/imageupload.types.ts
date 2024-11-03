import { Document } from "mongoose";

export interface IPlace extends Document {
  place_name: string;
  images: string[];
}
