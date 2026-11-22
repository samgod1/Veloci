import { useContext } from "react";

import { TypingAreaContext } from "../TypingArea";
import Caret from "./Caret/Caret";
import Word from "./Word/Word";

const Words = () => {
    const { words, currentLine } = useContext(TypingAreaContext);

    return (
        <div
            className="words"
            style={{
                top: `-${currentLine >= 2 ? (currentLine - 1) * 1.4 : 0}em`,
            }}
        >
            <Caret />
            {words.map((word, wordIndex) => {
                return <Word word={word} wordIndex={wordIndex} />;
            })}
        </div>
    );
};

export default Words;
