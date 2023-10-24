import React from "react";
import "./index.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const Carousel = () => {
  return (
    <div className="Carousel">
      <Splide options={{ type: "loop", pagination: "" }}>
        <SplideSlide>
          <h5>test1</h5>
        </SplideSlide>
        <SplideSlide>
          <h5>test2</h5>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Carousel;
