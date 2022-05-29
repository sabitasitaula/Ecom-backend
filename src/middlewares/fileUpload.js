import multer from "multer";
import path from "path";

const filterImages = (file, cb) => {
  const fileType = /jpeg|jpg|png/;
  const extName = fileType.test(path.extname(file.originalname));
  const mimeType = fileType.test(file.mimetype);
  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb("Not a file type");
  }
};

const filterFiles = (file, cb) => {
  const fileType = /pdf/;
  const extName = fileType.test(path.extname(file.originalname));
  const mimeType = fileType.test(file.mimetype);
  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb("Not a file type");
  }
};

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
  },
});

export const upload = {
  image: multer({
    storage: fileStorageEngine,
    limits: { fileSize: 500000 },
    fileFilter: (req, file, cb) => {
      filterImages(file, cb);
    },
  }),
  file: multer({
    storage: fileStorageEngine,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
      filterFiles(file, cb);
    },
  }),
};
