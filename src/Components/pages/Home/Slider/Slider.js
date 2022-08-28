import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { useQuery } from 'react-query';
import Loading from "../../../shared/Loading/Loading";

const Slider = () => {

  const {data : sliderImages, isLoading} = useQuery(['sliders'], ()=>(
    fetch("http://localhost:5000/sliders")
      .then((res) => res.json())
  ));

  if(isLoading){
    return <Loading />
  }

  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="mySwiper"
    >
      {sliderImages?.map((image) => (
        <SwiperSlide key={image._id}>
          <img src={image.img} alt="slider" className="rounded" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
