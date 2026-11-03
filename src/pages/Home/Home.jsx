import { useState } from "react";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const text =
        "The Hugo Award for Best Novella is one of the Hugo Awards given each year for science fiction or fantasy stories published in English or translated into English during the previous calendar year.";
    const words = text.split(" ");
    const [userInput, setUserInput] = useState("");
    const [activeWordId, setActiveWordId] = useState(0);
    const [activeWord, setActiveWord] = useState(words[0]);
    const [activeWordData, setActiveWordData] = useState(null);
    const [data, setData] = useState([]);

    function checkUserInput() {
        const correctLetters = activeWord.split("");
        const userLetters = userInput.split("");

        let a = [];
        for (let i = 0; i < userLetters.length; i++) {
            if (userLetters[i] == correctLetters[i]) {
                a.push(1);
            } else {
                a.push(0);
            }
        }
        console.log(a);

        // If user presses space and goes to next word
        if (
            userInput.at(-1) === " " &&
            userInput.length === activeWord.length
        ) {
            setActiveWordData((prev) => [...prev, a]);
            changeToNextWord();
        }
    }

    function changeToNextWord() {
        setActiveWordId((prev) => prev + 1);
        setData([...prev, activeWordData]);
    }

    useEffect(() => {
        if (userInput?.length) {
            checkUserInput();
        }
    }, [userInput]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <main>
            <div className="wordsWrapper">
                <div className="words">
                    {words.map((word, i) => (
                        <span className="word" id={i}>
                            {word}
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
