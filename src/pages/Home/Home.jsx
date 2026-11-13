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
    const [positionOfCaret, setPositionOfCaret] = useState(0);
    const [userInputCheck, setUserInputCheck] = useState([]);

    // Starts from -1 cuz I need the index of letter to start from 0
    let indexOfLetter = -1;

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

    useEffect(() => {
        updateCaretLetter();
        // Move caret
        setPositionOfCaret(userInput.length);
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
                    {words.map((word) => {
                        return (
                            <span className="word">
                                {word.split("").map((letter) => {
                                    indexOfLetter += 1;

                                    if (
                                        userInputCheck[indexOfLetter] ===
                                        undefined
                                    )
                                        return (
                                            <span
                                                className={"letter"}
                                                key={indexOfLetter}
                                            >
                                                {letter === " "
                                                    ? "\xA0"
                                                    : letter}
                                            </span>
                                        );

                                    if (userInputCheck[indexOfLetter]) {
                                        return (
                                            <span
                                                className={"letter correct"}
                                                key={indexOfLetter}
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
                                                key={indexOfLetter}
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
