import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import CircleRating from "../circleRating/circleRating";
import Genres from "../genres/Genres";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";

function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  function scrollCarousel(dir) {
    const container = carouselContainer.current
    const scrollAmount = dir == 'left' ? 
    container.scrollLeft - (container.offsetWidth + 20) : 
    container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    })
  }

  function createSkeleton(count) {
    let result = []
    for (let i = 0; i < count; i++) {      
      result.push(
        <div key={i.toString()} className="skeleton__item">
            <div className="poster-block skeleton"></div>
            <div className="text-block">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
      )
    }
    return result
  }

  return (
    <div className="carousel">
      <ContentWrapper className='contentWrapper'>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carousel__leftNav arrow"
          onClick={() => scrollCarousel("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel__rightNav arrow"
          onClick={() => scrollCarousel("right")}
        />
        {!loading ? 
        (
          <div className="carousel__items" ref={carouselContainer}>
             {data?.map(item => {
              const posterUrl = item.poster_path ?
              url.poster + item.poster_path :
              PosterFallback;

              return (
                <div 
                key={item.id} 
                className="carousel__item" 
                onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                >
                  <div className="poster-block">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="text-block">
                    <span className="title">
                      {item.title || item.name}
                    </span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              )
             })}
          </div>
        ) : 
        (
          <div className="skeleton">
             {createSkeleton(5)}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
