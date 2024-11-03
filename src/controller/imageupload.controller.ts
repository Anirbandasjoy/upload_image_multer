import { NextFunction, Request, Response } from "express";
import { successResponse } from "./response.controller";
import Place from "../models/imageupload.model";
import createHttpError from "http-errors";
import path from "path";
import fs from "fs/promises";

export const handleImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { place_name } = req.body;

    const imagePaths = (req.files as Express.Multer.File[])?.map(
      (file) => file.filename
    );

    if (!imagePaths || imagePaths.length === 0) {
      next(createHttpError(400, "No images uploaded."));
      return;
    }
    const newPlace = await Place.create({
      place_name,
      images: imagePaths,
    });

    successResponse(res, {
      statusCode: 201,
      message: "Image(s) have been uploaded successfully",
      payload: newPlace,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindAllPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const places = await Place.find();
    successResponse(res, {
      statusCode: 200,
      message: "All places retrieved successfully",
      payload: places,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const placeToDelete = await Place.findById(id);

    if (!placeToDelete) {
      return next(createHttpError(404, "Place not found."));
    }

    const images = placeToDelete.images;
    if (images && images.length > 0) {
      const deletionPromises = images.map(async (imageName) => {
        const fullPath = path.join(__dirname, "..", "..", "uploads", imageName);
        try {
          await fs.access(fullPath);
          await fs.unlink(fullPath);
        } catch (err: any) {
          if (err.code === "ENOENT") {
            console.warn(`File not found: ${fullPath}`);
          } else {
            console.error(`Failed to delete image at ${fullPath}:`, err);
          }
        }
      });
      await Promise.all(deletionPromises);
    }

    await Place.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Place deleted successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindSinglePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const place = await Place.findById(id);

    if (!place) {
      return next(createHttpError(404, "Place not found."));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Place retrieved successfully",
      payload: place,
    });
  } catch (error) {
    next(error);
  }
};
