import { useRef, useContext } from "react";

import { GlobalContext } from "../../../Home";

const Restart = () => {
    const restartImgRef = useRef(null);

    const { setHasFinished, startingTime, setTimer } =
        useContext(GlobalContext);

    function changeRestartImg(color) {
        if (color == "light") {
            restartImgRef.current.src = "/images/restartLight.svg";
        } else if (color === "dark")
            restartImgRef.current.src = "/images/restartDark.svg";
    }

    function restart() {
        setHasFinished(false);
        setTimer(startingTime);
    }

    return (
        <button
            onClick={restart}
            className="restartBtn"
            onFocus={() => changeRestartImg("light")}
            onBlur={() => changeRestartImg("dark")}
        >
            <img
                src="/images/restartDark.svg"
                alt="restart icon"
                ref={restartImgRef}
                onMouseOver={() => changeRestartImg("light")}
                onMouseOut={() => changeRestartImg("dark")}
            />
        </button>
    );
};

export default Restart;
