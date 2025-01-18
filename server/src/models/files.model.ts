import mongoose, { Types , Model } from "mongoose";
import multer from "multer";
import path from "path";

const file_path = path.join(__dirname, "../uploads");

export interface IFILE extends Document {
    _id: Types.ObjectId;
    filePath: string;
    fileName: string;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


export interface IFileModel extends Model<IFILE> {
    uploadedFiles: (req: Express.Request, res: Express.Response, callback: multer.FileFilterCallback) => void;
    getFilePath(): string;
  }

const fileSchema = new mongoose.Schema<IFILE>({
    filePath: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    "text/csv", 
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, file_path);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

fileSchema.statics.uploadedFiles = multer({ storage: storage , fileFilter: fileFilter }).single("file");
fileSchema.statics.getFilePath = function() {
    return file_path;
};

const File = mongoose.model<IFILE, IFileModel>("File", fileSchema);

export default File ;