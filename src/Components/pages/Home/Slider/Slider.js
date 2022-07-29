import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import sliderimg from "../../../../Images/slider.jpg";

const Slider = () => {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    fetch("data/slider.json")
      .then((res) => res.json())
      .then((images) => setSliderImages(images));
  }, []);

  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">

      {/* {sliderImages?.map((image) => (
        <SwiperSlide key={image._id}>
            <img src={image.img} alt="slider" className='rounded' />
        </SwiperSlide>
      ))} */}

        <SwiperSlide>
            <img src={sliderimg} className="rounded" alt="" />
        </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
