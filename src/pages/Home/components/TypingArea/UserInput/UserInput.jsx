import { useContext } from "react";

import { TypingAreaContext } from "../TypingArea";

const UserInput = () => {
    const { userInput, setUserInput } = useContext(TypingAreaContext);

    return (
        <textarea
            value={userInput}
            onChange={(e) => {
                setUserInput(e.target.value);
            }}
        />
    );
};

export default UserInput;
