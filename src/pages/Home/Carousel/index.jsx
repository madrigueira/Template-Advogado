import React from "react";
import "./index.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import carousel_1 from "../../../assets/carousel-1.png";
import carousel_2 from "../../../assets/carousel-2.png";

const Carousel = () => {
  return (
    <div className="Carousel">
      <Splide
        className="splide"
        options={{ type: "loop", pagination: "inside", drag: "", cover: true }}
      >
        <SplideSlide className="slide" id="slide-1">
          <img src={carousel_1} alt="" />
          <div className="content">
            <h1>Lorem Ipsum Dolor</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              dolores eius, similique atque, modi dolore mollitia quasi sit
              rerum accusantium culpa maiores deserunt cum laboriosam voluptatum
              dolor suscipit earum voluptates a quia repellendus, voluptate
              fuga. Id alias saepe esse sit?
            </p>
            <a href="#">Agendar Agora</a>
          </div>
        </SplideSlide>
        <SplideSlide className="slide" id="slide-2">
          <img src={carousel_2} alt="" />
          <div className="content">
            <h1>Lorem Ipsum Dolor</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              dolores eius, similique atque, modi dolore mollitia quasi sit
              rerum accusantium culpa maiores deserunt cum laboriosam voluptatum
              dolor suscipit earum voluptates a quia repellendus, voluptate
              fuga. Id alias saepe esse sit?
            </p>
            <a href="#">Lorem Ipsum</a>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Carousel;
