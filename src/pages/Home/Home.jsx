import { useState } from "react";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const text = "The Hugo Award for Best.";
    const [words, setWords] = useState(text.split(" "));
    const [userInput, setUserInput] = useState("");
    const [activeWordId, setActiveWordId] = useState(0);
    const [activeWord, setActiveWord] = useState(words[0]);
    const [activeWordData, setActiveWordData] = useState([]);
    const [data, setData] = useState([]);
    const [activeLetterData, setActiveLetterData] = useState([]);

    function checkUserInput() {
        const correctLetters = activeWord.split("");
        const userLetters = userInput.split("");

        // If user presses space and goes to next word
        if (userInput.at(-1) === " ") {
            changeToNextWord();
            setUserInput("");
            return;
        }

        let updatedParticularData = data[activeWordId].map((value, i) => {
            if (!userLetters[i]) {
                return 0;
            }

            if (userLetters[i] == correctLetters[i]) {
                return 1;
            } else {
                return 2;
            }
        });

        let updatedData = data.map((value, i) => {
            return i === activeWordId ? updatedParticularData : value;
        });

        setData(updatedData);
    }

    function changeToNextWord() {
        setActiveWordId((prev) => prev + 1);
        setActiveWord(words[activeWordId + 1]);
    }

    useEffect(() => {
        if (userInput?.length) {
            checkUserInput();
        }
    }, [userInput]);

    useEffect(() => {
        let updatedData = [];

        words.map((word) => {
            let defaultWordData = [];
            for (let i = 0; i < word.length; i++) {
                defaultWordData.push(0);
            }
            updatedData.push(defaultWordData);
        });

        setData(updatedData);
    }, [words]);

    return (
        <main>
            <div className="wordsWrapper">
                <div className="words">
                    {words.map((word, i) => (
                        <span className="word" id={i} key={i}>
                            {word.split("").map((letter, j) => {
                                try {
                                    if (data[i][j] == 1) {
                                        return (
                                            <span className="letter correct">
                                                {letter}
                                            </span>
                                        );
                                    } else if (data[i][j] == 2) {
                                        return (
                                            <span className="letter incorrect">
                                                {letter}
                                            </span>
                                        );
                                    } else {
                                        return (
                                            <span className="letter">
                                                {letter}
                                            </span>
                                        );
                                    }
                                } catch (error) {
                                    return (
                                        <span className="letter">{letter}</span>
                                    );
                                }
                            })}
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
