import { useContext } from "react";

import { TypingAreaContext } from "../../TypingArea";
import Letter from "./Letter/Letter";

const Word = ({ word, wordIndex }) => {
    const { words } = useContext(TypingAreaContext);

    return (
        <span className="word">
            {word.split("").map((letter, letterIndex) => {
                const globalIndexOfLetter =
                    words
                        .slice(0, wordIndex)
                        .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                return (
                    <Letter
                        letter={letter}
                        globalIndexOfLetter={globalIndexOfLetter}
                    />
                );
            })}
        </span>
    );
};

export default Word;
