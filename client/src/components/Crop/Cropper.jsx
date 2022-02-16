import React, { useCallback, useEffect, useState } from "react";
import ImgCropper from "react-easy-crop";


function Cropper({ image, imagesUrl, setImagesUrl, index, aspect }) {
  const [crop, setCrop] = useState(imagesUrl[index].crop);
  const [zoom, setZoom] = useState(imagesUrl[index].zoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(
    imagesUrl[index].croppedAreaPixels
  );

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    imagesUrl[index].crop = crop;
    imagesUrl[index].zoom = zoom;
    imagesUrl[index].croppedAreaPixels = croppedAreaPixels;
    setImagesUrl(imagesUrl);
  }, [crop, zoom, croppedAreaPixels]);

  return (
    <>
      <ImgCropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        className="w-full h-full"
      />
    </>
  );
}

export default Cropper;
