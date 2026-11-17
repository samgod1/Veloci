import { useState, useRef } from "react";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const [text, setText] = useState(
        "phantom is a 3-day escape room hackathon in philadelphia, from february 12-14, 2027. build creative projects for 50 hours to earn an invite, then spend a long weekend in a venue full of puzzles with everyone else who earned theirs.",
    );
    const [words, setWords] = useState(text.split(/(?<= )/));
    const [letters, setLetters] = useState(text.split(""));
    const [userInput, setUserInput] = useState("");
    const [caretLetter, setCaretLetter] = useState("");
    const [positionOfCaret, setPositionOfCaret] = useState({ x: 0, y: 0 });
    const [userInputCheck, setUserInputCheck] = useState([]);

    const charsRef = useRef([]);

    function updateCaretLetter() {
        let letter = letters[userInput.length];

        setCaretLetter(letter === " " ? "\xA0" : letter);
    }

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

    function moveCaret() {
        const activeSpan = charsRef.current[userInput.length];

        let x = activeSpan.offsetLeft;
        let y = activeSpan.offsetTop;

        setPositionOfCaret({ x: x, y: y });
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
                            transform: `translate(${positionOfCaret.x}px, ${positionOfCaret.y}px)`,
                        }}
                    >
                        {caretLetter}
                    </span>

                    {/* WORDS */}
                    {words.map((word, wordIndex) => {
                        return (
                            <span className="word">
                                {/* LETTERS */}
                                {word.split("").map((letter, letterIndex) => {
                                    const globalIndexOfLetter =
                                        words
                                            .slice(0, wordIndex)
                                            .reduce(
                                                (acc, w) => acc + w.length,
                                                0,
                                            ) + letterIndex;

                                    if (
                                        userInputCheck[globalIndexOfLetter] ===
                                        undefined
                                    )
                                        return (
                                            <span
                                                className={"letter"}
                                                key={globalIndexOfLetter}
                                                ref={(element) => {
                                                    charsRef.current[
                                                        globalIndexOfLetter
                                                    ] = element;
                                                }}
                                            >
                                                {letter === " "
                                                    ? "\xA0"
                                                    : letter}
                                            </span>
                                        );

                                    if (userInputCheck[globalIndexOfLetter]) {
                                        return (
                                            <span
                                                className={"letter correct"}
                                                key={globalIndexOfLetter}
                                                ref={(element) =>
                                                    (charsRef.current[
                                                        globalIndexOfLetter
                                                    ] = element)
                                                }
                                            >
                                                {letter === " "
                                                    ? "\xA0"
                                                    : letter}
                                            </span>
                                        );
                                    } else {
                                        return (
                                            <span
                                                className={"letter incorrect"}
                                                key={globalIndexOfLetter}
                                                ref={(element) =>
                                                    (charsRef.current[
                                                        globalIndexOfLetter
                                                    ] = element)
                                                }
                                            >
                                                {letter === " " ? "_" : letter}
                                            </span>
                                        );
                                    }
                                })}
                            </span>
                        );
                    })}
                </div>
                <textarea
                    value={userInput}
                    onChange={(e) => {
                        setUserInput(e.target.value);
                    }}
                />
            </div>
        </main>
    );
};

export default Home;
