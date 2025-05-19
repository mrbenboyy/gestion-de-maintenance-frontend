import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { getCroppedImg } from "../utils/cropImage";

const ImageCropper = ({ imageSrc, onCancel, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteHandler = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-50">
      <div className="relative w-80 h-80 bg-white rounded-lg">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteHandler}
        />
      </div>
      <div className="w-64 mt-4">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, zoom) => setZoom(zoom)}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleDone}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Valider
        </button>
        <button
          onClick={onCancel}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
