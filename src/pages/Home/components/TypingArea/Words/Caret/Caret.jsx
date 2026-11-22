import { useContext } from "react";

import { TypingAreaContext } from "../../TypingArea";

const Caret = () => {
    const { positionOfCaret } = useContext(TypingAreaContext);

    return (
        <span
            className="caret"
            style={{
                transform: `translate(${positionOfCaret.x}px, ${positionOfCaret.y}px)`,
            }}
        ></span>
    );
};

export default Caret;
