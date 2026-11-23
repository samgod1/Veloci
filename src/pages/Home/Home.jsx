import { useState, useRef } from "react";

import "./Home.css";
import { createContext } from "react";
import Timer from "./components/Timer/Timer";
import TypingArea from "./components/TypingArea/TypingArea";

export const GlobalContext = createContext();

const Home = () => {
    const [userInputCheck, setUserInputCheck] = useState([]);

    const [hasStarted, setHasStarted] = useState(false);
    const [timer, setTimer] = useState(30);

    return (
        <GlobalContext
            value={{
                userInputCheck,
                setUserInputCheck,
                hasStarted,
                setHasStarted,
                timer,
                setTimer,
            }}
        >
            <main>
                <Timer />
                <TypingArea />
            </main>
        </GlobalContext>
    );
};

export default Home;
