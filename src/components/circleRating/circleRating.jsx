import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

function CircleRating({ rating }) {

    function chooseColor() {
        if (rating < 5) {
            return 'red'
        } else if (rating < 7) {
            return 'orange'
        } else {
            return 'green'
        }
    }

    return (
        <div className="circle-rating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor: chooseColor()
                })}
            />
        </div>
    );
};

export default CircleRating