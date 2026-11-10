import { useState, useRef } from "react";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const [text, setText] = useState("Hello world is the best.");
    const [letters, setLetters] = useState(text.split(""));
    const [userInput, setUserInput] = useState("");
    const [activeWord, setActiveWord] = useState("");
    const [caretLetter, setCaretLetter] = useState("");
    const [positionOfCaret, setPositionOfCaret] = useState(0);
    const [userInputCheck, setUserInputCheck] = useState([]);

    const prevUserInputLengthRef = useRef(0);

    function updateCaretLetter() {
        let userInputlength = userInput.length;
        let letter =
            activeWord[userInputlength] == undefined
                ? "\xA0"
                : activeWord[userInputlength];

        setCaretLetter(letter);
    }

    function checkUserInput() {
        if (userInput.length > activeWord.length) updateExceededWords();

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

    function moveCaret() {
        if (userInput.length > prevUserInputLengthRef.current) {
            setPositionOfCaret((prev) => prev + 1);
        } else if (userInput.length < prevUserInputLengthRef.current) {
            setPositionOfCaret((prev) => prev - 1);
        }
    }

    useEffect(() => {
        updateCaretLetter();
        moveCaret();
        checkUserInput();
    }, [userInput]);

    return (
        <main>
            <div className="wordsWrapper">
                <div className="words">
                    {/* CARET */}
                    <span
                        className="caret"
                        style={{
                            transform: `translateX(${positionOfCaret * 100}%)`,
                        }}
                    >
                        {caretLetter}
                    </span>
                    {/* LETTERS */}
                    {letters.map((letter, i) => {
                        if (userInputCheck[i] === undefined)
                            return (
                                <span className={"letter"} key={i}>
                                    {letter === " " ? "\xA0" : letter}
                                </span>
                            );

                        if (userInputCheck[i]) {
                            return (
                                <span className={"letter correct"} key={i}>
                                    {letter === " " ? "\xA0" : letter}
                                </span>
                            );
                        } else {
                            return (
                                <span className={"letter incorrect"} key={i}>
                                    {letter === " " ? "_" : letter}
                                </span>
                            );
                        }
                    })}
                </div>
                <textarea
                    value={userInput}
                    onChange={(e) => {
                        prevUserInputLengthRef.current = userInput.length;
                        setUserInput(e.target.value);
                    }}
                />
            </div>
        </main>
    );
};

export default Home;
