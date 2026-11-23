import { useState, useRef } from "react";

import "./Home.css";
import { createContext } from "react";
import Timer from "./components/Timer/Timer";
import TypingArea from "./components/TypingArea/TypingArea";
import { useEffect } from "react";

export const GlobalContext = createContext();

const Home = () => {
    const [userInputCheck, setUserInputCheck] = useState([]);
    const [hasStarted, setHasStarted] = useState(false);
    const [startingTime, setStartingTime] = useState(5);
    const [timer, setTimer] = useState(startingTime);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    function calculateWpmAndAccuracy() {
        const totalUserInput = userInputCheck.length;

        if (totalUserInput === 0) return;

        const correct_letters_typed = userInputCheck.reduce(
            (acc, currentValue) => {
                return acc + currentValue;
            },
        );
        const incorrect_letters_typed = userInputCheck.reduce(
            (acc, currentValue) => {
                return currentValue == 0 ? acc + 1 : acc;
            },
            0,
        );

        setWpm((correct_letters_typed / 5) * (60 / startingTime));
        setAccuracy((correct_letters_typed / totalUserInput) * 100);
    }

    useEffect(() => {
        if (!hasStarted) {
            calculateWpmAndAccuracy();
        }
    }, [hasStarted]);

    useEffect(() => {
        console.log(wpm, accuracy);
    }, [wpm]);

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
