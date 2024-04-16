import { Router } from "express";
import * as fileController from "../controllers/fileController";
import upload from "../middlewares/multer";

const router = Router();

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/files", fileController.getFiles);
router.get("/files/:filename", fileController.downloadFile);
router.delete("/files/:filename", fileController.deleteFile);

export default router;
