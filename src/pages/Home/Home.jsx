import { useState, useRef } from "react";

import "./Home.css";
import { useEffect, useContext, createContext } from "react";
import TypingArea from "./components/TypingArea/TypingArea";

export const GlobalContext = createContext();

const Home = () => {
    const [userInputCheck, setUserInputCheck] = useState([]);

    const [hasStarted, setHasStarted] = useState(false);
    const [timer, setTimer] = useState(30);

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

    return (
        <GlobalContext
            value={{
                userInputCheck,
                setUserInputCheck,
                hasStarted,
                setHasStarted,
            }}
        >
            <main>
                <div className="timer">{timer}</div>
                {/* I'll remove this prop later and add a globalContext later */}
                <TypingArea />
            </main>
        </GlobalContext>
    );
};

export default Home;
