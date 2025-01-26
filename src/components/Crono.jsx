import React, { useRef, useState, useEffect } from "react";

const Cronometro = () => {
const [startTime, setStartTime] = useState(null);
const [elapsedTime, setElapsedTime] = useState(0);
const [isRunning, setIsRunning] = useState(false);
const [initialTime, setInitialTime] = useState(0);
const [gifState, setGifState] = useState({ running: false, timeUp: false });
const intervalRef = useRef(null);

useEffect(() => {
    if (isRunning) {
        intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime;
        setElapsedTime(timeElapsed);
        if (initialTime > 0 && timeElapsed >= initialTime) {
            setElapsedTime(initialTime);
            setIsRunning(false);
        }
    }, 10);
    } else {
        clearInterval(intervalRef.current);
    }

    return () => {
        clearInterval(intervalRef.current);
    };
}, [isRunning, startTime, initialTime]);

useEffect(() => {
    if (isRunning) {
        setGifState({ running: true, timeUp: false });
    } else if (initialTime > 0 && elapsedTime >= initialTime) {
        setGifState({ running: false, timeUp: true });
    } else {
        setGifState({ running: false, timeUp: false });
    }
}, [isRunning, elapsedTime, initialTime]);

function handleStart() {
    setIsRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0);
}

function handleStop() {
    setIsRunning(false);
}

function handleReset() {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setInitialTime(0);
    setGifState({ running: false, timeUp: false });
}

function handleInitialTimeChange(event) {
    const newTime = event.target.value * 1000;
    setInitialTime(newTime);
}

const remainingTime = initialTime - elapsedTime;
const secondsPassed = remainingTime > 0 ? remainingTime / 1000 : 0;
const digits = secondsPassed.toFixed(3).split("");

return (
    <>
        <h1 className="titulo">
            <i className="bi bi-clock-history"></i>
        </h1>
        <div className="cronos">
            <i className="far fa-clock icon"></i>
            {digits.map((digit, index) => (
        <div key={index}>{digit}</div>
        ))}
    </div>
    <br />
    <input
        type="number"
        placeholder="Initial time"
        onChange={handleInitialTimeChange}
    />
    <br />
    <br />
    <div>
        <button className="start" onClick={handleStart}>
            Start
        </button>
        <button className="stop" onClick={handleStop}>
            Stop
        </button>
        <button className="reset" onClick={handleReset}>
            Reset
        </button>
    </div>
        {gifState.running && (
        <div id="runner">
            <img src="https://media.tenor.com/QDMbugjpLc8AAAAM/pepsiman-pepsi.gif" alt="Running GIF" />
        </div>
    )}
        {gifState.timeUp && (
        <div id="timeup">
            <img src="https://i.imgur.com/LbGsCUe.gif" alt="Time Up GIF" />
        </div>
    )}
    </>
);
};

export default Cronometro;
