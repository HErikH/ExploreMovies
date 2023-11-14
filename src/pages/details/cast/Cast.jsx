import { useSelector } from "react-redux";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

import "./style.scss";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    function createSkeleton(count) {
    let result = []
       for (let i = 0; i < count; i++) {      
         result.push(
           <div key={i.toString()} className="cast-skeleton__item">
               <div className="circle skeleton"></div>
               <div className="row1 skeleton"></div>
               <div className="row2 skeleton"></div>
           </div>
         )
       }
       return result
    }

    return (
        <div className="cast-section">
            <ContentWrapper>
                <div className="section-heading">Top Cast</div>
                {!loading ? (
                    <div className="list-items">
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="list-items__item">
                                    <div className="profile-image">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="cast-skeleton">
                        {createSkeleton(6)}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;