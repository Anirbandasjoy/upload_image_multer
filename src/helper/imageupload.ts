import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "uploads/");
  },
  filename: function (req: Request, file: any, cb: any) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const upload = multer({ storage: storage });
