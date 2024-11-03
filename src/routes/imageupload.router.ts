import { Router } from "express";
import { upload } from "../helper/imageupload";
import {
  handleDeletePlace,
  handleFindAllPlaces,
  handleFindSinglePlace,
  handleImageUpload,
} from "../controller/imageupload.controller";

const imageUploadRouter = Router();

imageUploadRouter.post(
  "/upload",
  upload.array("images", 50),
  handleImageUpload
);
imageUploadRouter.get("/places", handleFindAllPlaces);
imageUploadRouter.delete("/place/:id", handleDeletePlace);
imageUploadRouter.get("/place/:id", handleFindSinglePlace);

export default imageUploadRouter;
