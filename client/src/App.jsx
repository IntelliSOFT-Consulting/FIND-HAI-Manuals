import { useEffect, useState } from "react";
import { defaultStyles, FileIcon } from "react-file-icon";
import useFiles from "./api/files";
import { Button, Input, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function App() {
  const { files, error, loading, getFiles, filterFiles } = useFiles();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getFiles();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterFiles(e.target.value);
  };

  const columns = [
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <div className="w-5 h-5">
              <FileIcon
                extension={record.name?.split(".")?.pop()}
                {...defaultStyles[record.name?.split(".")?.pop()]}
              />
            </div>
            <p className="ml-3">{record.name}</p>
          </div>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (text) => <p>{text} MB</p>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{new Date(text).toDateString()}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex">
          <a
            href={`/server/files/${record.name}`}
            target="_blank"
            rel="noreferrer"
            download={record.name}
            className="mr-2"
          >
            <Button className="download-btn" icon={<DownloadOutlined />} />
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto py-16 px-8">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      <Input
        placeholder="Search files"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="my-10 overflow-x-auto">
        <Table
          dataSource={files}
          columns={columns}
          size="small"
          pagination={{ pageSize: 12, hideOnSinglePage: true }}
          locale={{
            emptyText: "No files",
          }}
        />
      </div>
    </div>
  );
}

export default App;
