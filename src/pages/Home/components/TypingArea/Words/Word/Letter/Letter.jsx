import { useContext } from "react";

import { GlobalContext } from "../../../../../Home";
import { TypingAreaContext } from "../../../TypingArea";

const Letter = ({ letter, globalIndexOfLetter }) => {
    const { userInputCheck } = useContext(GlobalContext);
    const { charsRef } = useContext(TypingAreaContext);

    if (userInputCheck[globalIndexOfLetter] === undefined)
        return (
            <span
                className={"letter"}
                key={globalIndexOfLetter}
                ref={(element) => {
                    charsRef.current[globalIndexOfLetter] = element;
                }}
            >
                {letter === " " ? "\xA0" : letter}
            </span>
        );

    if (userInputCheck[globalIndexOfLetter]) {
        return (
            <span
                className={"letter correct"}
                key={globalIndexOfLetter}
                ref={(element) =>
                    (charsRef.current[globalIndexOfLetter] = element)
                }
            >
                {letter === " " ? "\xA0" : letter}
            </span>
        );
    } else {
        return (
            <span
                className={"letter incorrect"}
                key={globalIndexOfLetter}
                ref={(element) =>
                    (charsRef.current[globalIndexOfLetter] = element)
                }
            >
                {letter === " " ? "_" : letter}
            </span>
        );
    }
};

export default Letter;
