import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "semantic-ui-react";

interface IProps {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px"
};

const dropzoneActive = {
  borderColor: "green"
};

const PhotoWidgetDropzone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the picture here ...</p>
      ) : (
        <div>
          <p>
            {" "}
            <Icon name="upload" size="big" />{" "}
          </p>
          <p>
            Drag and drop a picture here, or click to select a file from your
            computer.
          </p>
        </div>
      )}
    </div>
  );
};
export default PhotoWidgetDropzone;
