import { useState, useRef, useEffect, createContext } from "react";
import { useContext } from "react";

import UserInput from "./UserInput/UserInput";
import Words from "./Words/Words";
import { GlobalContext } from "../../Home";

export const TypingAreaContext = createContext();

const TypingArea = ({ checkUserInput }) => {
    const [text, setText] = useState(
        "phantom is a 3-day escape room hackathon in philadelphia, from february 12-14, 2027. build creative projects for 50 hours to earn an invite, then spend a long weekend in a venue full of puzzles with everyone else who earned theirs.",
    );
    const [words, setWords] = useState(text.split(/(?<= )/));
    const [letters, setLetters] = useState(text.split(""));
    const [userInput, setUserInput] = useState("");
    const [currentLine, setCurrentLine] = useState(0);

    const charsRef = useRef([]);
    const prevLetterPositionRef = useRef(0);

    const { hasStarted, setHasStarted, setUserInputCheck } =
        useContext(GlobalContext);

    function checkUserInput() {
        // userInputCheck data needs to be calculated every time from scratch maybe fix it in future if it causes performance issues
        const updatedUserInputCheck = userInput.split("").map((letter, i) => {
            if (letter === letters[i]) {
                return 1;
            } else {
                return 0;
            }
        });

        setUserInputCheck(updatedUserInputCheck);
    }

    function checkCurrentLine() {
        const currentLetterPosition =
            charsRef.current[userInput.length].offsetTop;

        if (currentLetterPosition > prevLetterPositionRef.current) {
            setCurrentLine((prev) => prev + 1);
        } else if (prevLetterPositionRef.current > currentLetterPosition) {
            setCurrentLine((prev) => prev - 1);
        }

        prevLetterPositionRef.current = currentLetterPosition;
    }

    useEffect(() => {
        if (!hasStarted && userInput.length > 0) {
            setHasStarted(true);
        }
        checkUserInput();
        checkCurrentLine();
    }, [userInput]);

    return (
        <TypingAreaContext
            value={{
                words,
                letters,
                userInput,
                setUserInput,
                currentLine,
                charsRef,
                prevLetterPositionRef,
            }}
        >
            <div className="wordsWrapper">
                <Words />
                <UserInput />
            </div>
        </TypingAreaContext>
    );
};

export default TypingArea;
