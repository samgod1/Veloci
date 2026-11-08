import { useState } from "react";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const text = "The Hugo Award for Best.";
    const [wordsData, setWordsData] = useState([]);

    const [userInput, setUserInput] = useState("");
    const [activeWordId, setActiveWordId] = useState(0);
    const [activeWord, setActiveWord] = useState("");
    const [caretLetter, setCaretLetter] = useState("");

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
        updateCaretLetter();

        // Move to next word if user enters space
        if (userInput.at(-1) === " ") {
            changeToNextWord();
            setUserInput("");
            return;
        }

        if (userInput.length > activeWord.length) updateExceededWords();

        updateWordStatus();
    }

    function changeToNextWord() {
        setActiveWordId((prev) => prev + 1);
        setActiveWord(wordsData[activeWordId + 1].word);
    }

    useEffect(() => {
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
                    <span className="caret">{caretLetter}</span>
                    {/* WORD */}
                    {wordsData.map((data) => (
                        <span className="word" id={data.id} key={data.id}>
                            {/* LETTER */}
                            {data.word.split("").map((letter, j) => {
                                if (data.status[j] == 2) {
                                    return (
                                        <span className="letter">{letter}</span>
                                    );
                                }

                                return data.status[j] ? (
                                    <span className="letter correct">
                                        {letter}
                                    </span>
                                ) : (
                                    <span className="letter incorrect">
                                        {letter}
                                    </span>
                                );
                            })}

                            {/* EXCEEDED WORDS */}
                            <span className="exceededWords incorrect">
                                {data.exceededWords}
                            </span>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </div>
        </main>
    );
};

export default Home;
