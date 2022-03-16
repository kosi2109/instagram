import React from "react";
import { Carousel } from "react-responsive-carousel";

function DetailLeft({images}) {
  return (
    <div className="w-4/6 h-auto flex items-center justify-center">
      <Carousel
        showThumbs={false}
        showArrows={true}
        showIndicators={true}
        showStatus={false}
      >
        {images?.map((image) => (
          <img src={image.url} />
        ))}
      </Carousel>
    </div>
  );
}

export default DetailLeft;
