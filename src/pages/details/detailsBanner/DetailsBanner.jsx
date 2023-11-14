import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

import "./style.scss";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null)

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector(state => state.home)

    const genresId = data?.genres.map(genre => genre.id)

    const director = crew?.filter((item) => item.job == 'Director')
    const writer = crew?.filter((item) => item.job == 'Screenplay' || item.job == 'Story' || item.job == 'Writer')

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    function createInfoItem(info) {
        return info.map(({dataInfo, textBold}) => {
            return <div key={dataInfo} className="info__item">
                <span className="text bold">{textBold}</span>
                <span className="text">
                    {
                        dataInfo == 'release_date' ?
                        dayjs(data[dataInfo]).format('MMM D, YYYY') :
                        dataInfo == 'runtime' ? 
                        toHoursAndMinutes(data[dataInfo]) :
                        data[dataInfo]
                    }
                </span>
            </div>
        }) 
    }

    function createCrewInfo(info) {
        return info.map(item => {
            if ((Object.keys(item)).length > 0) {
            let {dataInfo, textBold} = item
            return <div key={textBold} className="info">
            <span className="text bold">{textBold}</span>
                <span className="text">
                    {dataInfo.map((item, i) => {
                        return <span key={item.id}>
                            {item.name + (dataInfo.length - 1 != i && ', ')}
                        </span>
                    })}
                </span>
            </div>
            }
        }) 
    }

    return (
        <div className="details-banner">
            {!loading ? 
            <>
             {data && 
             <>
                <div className="backdrop-img">
                    <Img src={url.backdrop + data.backdrop_path} />
                </div>
                <div className="opacity-layer">
                    
                </div>
                <ContentWrapper>
                    <div className="content">
                        <div className="left">
                            {data.poster_path ? 
                                <Img 
                                className="poster-image" 
                                src={url.backdrop + data.poster_path} /> :
                                <Img className="poster-image" src={PosterFallback} />
                            }
                        </div>
                        <div className="right">
                            <p className="title">
                                {`${data.name || data.title} (${dayjs(data.release_data).format('YYYY')})`}
                            </p>

                            <p className="subtitle">
                                {data.tagline}
                            </p>

                            <Genres data={genresId} />

                            <div className="row">
                                <CircleRating 
                                rating={data.vote_average.toFixed(1)}
                                />
                                <div 
                                className="play-button" 
                                onClick={() => {
                                    setShow(true)
                                    setVideoId(video.key)
                                }}>
                                    <PlayIcon />
                                    <span className="text">Watch Trailer</span>
                                </div>
                            </div>

                            <div className="overview">
                                <div className="heading">Overview</div>
                                <div className="description">{data.overview}</div>
                            </div>

                            <div className="info">  
                                {createInfoItem([
                                    {dataInfo: 'status', textBold: 'Status: '},
                                    {dataInfo: 'release_date', textBold: 'Release Date: '},
                                    {dataInfo: 'runtime', textBold: 'Runtime: '},
                                ])}
                            </div>

                            {crew && createCrewInfo([
                                {dataInfo: director, textBold: 'Director: '},
                                {dataInfo: writer, textBold: 'Writer: '},
                                data.created_by ? {dataInfo: data.created_by, textBold: 'Creator: '} : {},
                            ])}

                        </div>
                    </div>

                    <VideoPopup 
                    show={show} 
                    setShow={setShow} 
                    videoId={videoId} 
                    setVideoId={setVideoId} />
                </ContentWrapper>
             </>}
            </> : 
                <div className="details-banner__skeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            }
        </div>
    );
};

export default DetailsBanner;