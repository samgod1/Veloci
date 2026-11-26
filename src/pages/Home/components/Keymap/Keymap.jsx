import React from "react";
import { useEffect } from "react";

const Keymap = () => {
    const keys = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
        ["space"],
    ];

    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            console.log(e.key);
        });
    }, []);

    return (
        <div className="keymap">
            {keys.map((row) => {
                return (
                    <div className="row">
                        {row.map((key) => {
                            return (
                                <span
                                    className={
                                        key === "space" ? "key space" : "key"
                                    }
                                >
                                    {key}
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
