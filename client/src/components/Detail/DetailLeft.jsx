import React from "react";
import { Carousel } from "react-responsive-carousel";
import ProfileHeader from "./ProfileHeader";

function DetailLeft({post , setOpenOption}) {
  return (
    <div className="w-full md:w-4/6 h-auto flex flex-col md:flex-row items-center justify-center">
      <div className="block md:hidden w-full" >
        <ProfileHeader post={post} setOpenOption={setOpenOption} />
      </div>
      <Carousel
        showThumbs={false}
        showArrows={true}
        showIndicators={true}
        showStatus={false}
      >
        {post?.images?.map((image) => (
          <img src={image.url} />
        ))}
      </Carousel>
    </div>
  );
}

export default DetailLeft;
