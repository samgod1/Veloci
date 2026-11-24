import { useState, useContext } from "react";

import { TypingAreaContext } from "../../TypingArea";
import { GlobalContext } from "../../../../Home";
import { useEffect } from "react";

const Caret = () => {
    const [positionOfCaret, setPositionOfCaret] = useState({ x: 0, y: 0 });

    const { hasStarted } = useContext(GlobalContext);
    const { userInput, charsRef } = useContext(TypingAreaContext);

    function moveCaret() {
        const activeSpan = charsRef.current[userInput.length];

        let x = activeSpan.offsetLeft;
        let y = activeSpan.offsetTop;

        setPositionOfCaret({ x: x, y: y });
    }

    useEffect(() => {
        moveCaret();
    }, [userInput]);

    return (
        <span
            className="caret"
            style={{
                transform: `translate(${positionOfCaret.x}px, ${positionOfCaret.y}px)`,
                animation: hasStarted ? "" : "blinking 1s infinite",
            }}
        ></span>
    );
};

export default Caret;
