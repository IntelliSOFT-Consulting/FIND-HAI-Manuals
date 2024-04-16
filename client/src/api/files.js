import { useState } from "react";
import axios from "axios";

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/files");
      setFiles(response.data.files);
      setAllFiles(response.data.files);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const filterFiles = (searchTerm) => {
    setFiles(
      allFiles.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  return { files, error, loading, getFiles, filterFiles };
};

export default useFiles;
