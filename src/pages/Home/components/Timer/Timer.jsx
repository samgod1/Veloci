import { useRef, useEffect, useContext } from "react";

import { GlobalContext } from "../../Home";

const Timer = () => {
    const { timer, setTimer, hasStarted, setHasStarted } =
        useContext(GlobalContext);

    const timerIntervalRef = useRef(null);

    function startTimer() {
        timerIntervalRef.current = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerIntervalRef.current);
        setHasStarted(false);
    }

    useEffect(() => {
        if (hasStarted) {
            startTimer();
        }
    }, [hasStarted]);

    useEffect(() => {
        if (timer <= 0) {
            stopTimer();
        }
    }, [timer]);

    return <div className="timer">{timer.toString().padStart(2, "0")}</div>;
};

export default Timer;
