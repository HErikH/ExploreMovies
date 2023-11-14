import { useState } from "react"

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import Carousel from "../../../components/carousel/Carousel"

import useFetch from "../../../hooks/useFetch"

function Trending() {
  const [endpoint, setEndpoint] = useState('day')

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`)

  function onChangeTab(tab) {
    console.log(tab)
    setEndpoint(tab.toLowerCase())
  }

  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselSection__title">
                Trending
            </span>
            <SwitchTabs data={ ["Day", "Week"] } onChangeTab={onChangeTab} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending