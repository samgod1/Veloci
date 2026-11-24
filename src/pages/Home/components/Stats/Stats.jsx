import { useContext } from "react";

import { GlobalContext } from "../../Home";

const Stats = () => {
    const { wpm, accuracy } = useContext(GlobalContext);

    return (
        <div className="stats">
            Wpm: {wpm} Accuracy: {accuracy}%
        </div>
    );
};

export default Stats;
