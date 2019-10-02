import React, { Component } from "react";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import "./SwiperSlider.scss";

class SwiperSlider extends Component {
  render() {
    const params = {
      speed: 600,
      parallax: true,
      parallaxEl: {
        el: ".parallax-bg",
        value: "-23%"
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true
      },
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      grabCursor: true,
      loop: true,
      spaceBetween: 30,
      slidesPerGroup: 5,
      slidesPerView: 5,
      breakpoints: {
        480: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        360: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    };

    const base_url = "https://image.tmdb.org/t/p/w342";
    const { path } = this.props;

    console.log(this.props)
    return (
      <div className="slider-container">
        <Swiper {...params}>
          {this.props.items.map(item => (
            <Link
              key={item.id}
              to={`${path}/${item.id}`}
              onClick={() => this.props.history.push(`${path}/${item.id}`)}
            >
              <img
                className="swiper-img card"
                alt="poster"
                src={base_url + item.poster_path}
              />
            </Link>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default SwiperSlider;
