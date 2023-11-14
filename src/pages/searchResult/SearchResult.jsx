import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {fetchDataFromApi} from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import "./style.scss";

function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  async function fetchInitialData() {
    setLoading(true);
    let res = await fetchDataFromApi(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    setData(res);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  }

  async function fetchNextPageData () {
    let res = await fetchDataFromApi(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    if (data?.results) {
      setData({
        ...data,
        results: [...data.results, ...res.results]
      })
    } else {
      setData(res)
    }
    setPageNum((prev) => prev + 1);
  }

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="search-results-page">
      {
      loading ? 
      <Spinner initial={true} /> : 
      <ContentWrapper>
        {data?.results.length > 0 ? (
          <>
            <div className="page-title">
              {`Search ${data?.total_results > 1 ?
              "results" : "result" } 
              of '${query}'`}
            </div>
            <InfiniteScroll
            className="content"
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={pageNum <= data?.total_pages}
            loader={<Spinner />}
            >
              {data?.results.map((item, index) => {
                if (item.media_type == 'person') return
                return (
                  <MovieCard 
                  key={index} 
                  id={index} 
                  data={item} 
                  fromSearch={true} 
                  />
                )
              })}
            </InfiniteScroll>
          </>
        ) : (
          <span className="result-not-found">
            Sorry, results not found !
          </span>
        )
      }
      </ContentWrapper>
      }
    </div>
  )
}
export default SearchResult;
