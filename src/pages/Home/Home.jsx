import { useState, useRef } from "react";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const [text, setText] = useState("Hello world is the best.");
    const [letters, setLetters] = useState(text.split(""));
    console.log(letters);
    const [wordsData, setWordsData] = useState([]);

    const [userInput, setUserInput] = useState("");
    const [activeWordId, setActiveWordId] = useState(0);
    const [activeWord, setActiveWord] = useState("");
    const [caretLetter, setCaretLetter] = useState("");
    const [positionOfCaret, setPositionOfCaret] = useState(0);
    const [userInputCheck, setUserInputCheck] = useState([]);

    const prevUserInputLengthRef = useRef(0);

    function updateExceededWords() {
        let noOfNewLetters = userInput.length - activeWord.length;
        let exceededWords = userInput.slice(-noOfNewLetters);

        setWordsData((prev) =>
            prev.map((data, i) => {
                return activeWordId === i
                    ? { ...data, exceededWords: exceededWords }
                    : data;
            }),
        );
    }

    function updateWordStatus() {
        const correctLetters = activeWord.split("");
        const userLetters = userInput.split("");

        let updatedParticularStatus = activeWord.split("").map((_, i) => {
            if (!userLetters[i]) {
                return 2;
            }

            if (userLetters[i] == correctLetters[i]) {
                return 1;
            } else {
                return 0;
            }
        });

        setWordsData((prev) =>
            prev.map((data, i) => {
                return activeWordId === i
                    ? { ...data, status: updatedParticularStatus }
                    : data;
            }),
        );
    }

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

    function changeToNextWord() {
        setActiveWordId((prev) => prev + 1);
        setActiveWord(wordsData[activeWordId + 1].word);
    }

    useEffect(() => {
        updateCaretLetter();
        moveCaret();
        checkUserInput();
    }, [userInput]);

    useEffect(() => {
        updateCaretLetter();
    }, [activeWord]);

    useEffect(() => {
        const updatedWordsData = text.split(" ").map((word, i) => {
            return {
                id: i,
                word: word,
                status: Array(word.length).fill(2),
                exceededWords: "",
            };
        });

        setWordsData(updatedWordsData);
        setActiveWord(updatedWordsData[activeWordId].word);
    }, []);

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
                        console.log(userInputCheck);
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
