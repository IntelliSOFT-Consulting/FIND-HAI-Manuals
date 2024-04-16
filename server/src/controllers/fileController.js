import path from "path";
import fs from "fs";

export const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, "../../uploads");
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      // remove any hidden files
      const filteredFiles = files.filter((file) => !file.startsWith("."));
      return res.status(200).json({
        files: filteredFiles?.map((file) => ({
          name: file,
          // size in mb
          size: (
            fs.statSync(`${directoryPath}/${file}`).size / 1000000
          )?.toFixed(2),
          createdAt: fs.statSync(`${directoryPath}/${file}`).birthtime,
        })),
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const directoryPath = path.join(__dirname, "../../uploads");
    const filePath = `${directoryPath}/${filename}`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        return res.status(404).json({ message: "File not found" });
      }
      return res.download(filePath);
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const directoryPath = path.join(__dirname, "../../uploads");
    const filePath = `${directoryPath}/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "File deleted successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
