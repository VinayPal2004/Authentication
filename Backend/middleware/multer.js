import multer from "multer";

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder
  },

  filename: (req, file, cb) => {
    // 👇 filename clean karo
    const cleanName = file.originalname
      .replace(/\s+/g, "_")                 // space → _
      .replace(/[^a-zA-Z0-9._-]/g, "");    // special char remove

    cb(null, Date.now() + "-" + cleanName);
  },
});

// file filter (optional but useful)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});