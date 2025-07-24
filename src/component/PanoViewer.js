// components/PanoViewer.jsx
import React from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

const PanoViewer = ({ src }) => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <ReactPhotoSphereViewer
        src={src}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default PanoViewer;
