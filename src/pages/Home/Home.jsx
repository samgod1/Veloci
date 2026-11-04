import { useState } from "react";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const text = "The Hugo Award for Best.";
    const [wordsData, setWordsData] = useState([]);

    const [userInput, setUserInput] = useState("");
    const [activeWordId, setActiveWordId] = useState(0);
    const [activeWord, setActiveWord] = useState("");

    function checkUserInput() {
        const correctLetters = activeWord.split("");
        const userLetters = userInput.split("");

        // If user presses space and goes to next word
        if (userInput.at(-1) === " ") {
            changeToNextWord();
            setUserInput("");
            return;
        }

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

        let updatedWordsData = wordsData.map((data, i) => {
            return activeWordId === i
                ? { ...data, status: updatedParticularStatus }
                : data;
        });

        setWordsData(updatedWordsData);
    }

    function changeToNextWord() {
        setActiveWordId((prev) => prev + 1);
        setActiveWord(wordsData[activeWordId + 1].word);
    }

    useEffect(() => {
        if (userInput?.length) {
            checkUserInput();
        }
    }, [userInput]);

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
                                    <span className="correct">{letter}</span>
                                ) : (
                                    <span className="incorrect">{letter}</span>
                                );
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
