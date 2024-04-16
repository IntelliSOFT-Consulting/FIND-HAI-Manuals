import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const { originalname } = file;
    const fileExtension = path.extname(originalname);
    // remove spaces from the file name
    const fileName = path.basename(originalname, fileExtension).replace(/\s/g, "");
    const newFileName = `${fileName}-${Date.now()}${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({
  storage,
});

export default upload;
