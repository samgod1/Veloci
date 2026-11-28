import { useState, useRef, useEffect, useContext } from "react";

import { GlobalContext } from "../../Home";

const Keymap = () => {
    const [keys, setKeys] = useState([
        [
            { key: "q", highlighted: false },
            { key: "w", highlighted: false },
            { key: "e", highlighted: false },
            { key: "r", highlighted: false },
            { key: "t", highlighted: false },
            { key: "y", highlighted: false },
            { key: "u", highlighted: false },
            { key: "i", highlighted: false },
            { key: "o", highlighted: false },
            { key: "p", highlighted: false },
            { key: "[", highlighted: false },
            { key: "]", highlighted: false },
        ],
        [
            { key: "a", highlighted: false },
            { key: "s", highlighted: false },
            { key: "d", highlighted: false },
            { key: "f", highlighted: false },
            { key: "g", highlighted: false },
            { key: "h", highlighted: false },
            { key: "j", highlighted: false },
            { key: "k", highlighted: false },
            { key: "l", highlighted: false },
            { key: ";", highlighted: false },
            { key: "'", highlighted: false },
        ],
        [
            { key: "z", highlighted: false },
            { key: "x", highlighted: false },
            { key: "c", highlighted: false },
            { key: "v", highlighted: false },
            { key: "b", highlighted: false },
            { key: "n", highlighted: false },
            { key: "m", highlighted: false },
            { key: ",", highlighted: false },
            { key: ".", highlighted: false },
            { key: "/", highlighted: false },
        ],
        [{ key: "space", highlighted: false }],
    ]);

    const { hasStarted } = useContext(GlobalContext);

    function highlightKey(e) {
        const pressedKey = e.key;

        const updatedKeys = keys.map((row) => {
            return row.map((data) => {
                if (data.key === pressedKey) {
                    return { ...data, highlighted: true };
                } else {
                    return data;
                }
            });
        });

        setKeys(updatedKeys);
    }

    function removeHighlight(e) {
        const releasedKey = e.key;

        const updatedKeys = keys.map((row) => {
            return row.map((data) => {
                if (data.key === releasedKey) {
                    return { ...data, highlighted: false };
                } else {
                    return data;
                }
            });
        });

        setKeys(updatedKeys);
    }

    useEffect(() => {
        return () => {
            removeEventListener("keypress", highlightKey);
            removeEventListener("keyup", removeHighlight);
        };
    }, []);

    useEffect(() => {
        if (hasStarted) {
            document.addEventListener("keypress", highlightKey);
            document.addEventListener("keyup", removeHighlight);
        } else {
            removeEventListener("keypress", highlightKey);
            removeEventListener("keyup", removeHighlight);
        }
    }, [hasStarted]);

    return (
        <div className="keymap">
            {keys.map((row) => {
                return (
                    <div className="row">
                        {row.map((data) => {
                            return (
                                <span
                                    className={
                                        data.key === "space"
                                            ? "key space"
                                            : "key"
                                    }
                                    style={{
                                        backgroundColor: data.highlighted
                                            ? "var(--c-background-light)"
                                            : "var(--c-background-muted)",
                                    }}
                                    key={data.key}
                                >
                                    {data.key}
                                </span>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Keymap;
