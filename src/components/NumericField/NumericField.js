import React, { useState, useEffect } from 'react';
import './NumericField.css';

const NumericField = ({ initial = 10, cb, min = 0, max = 100 }) => {
    const [inputValue, setInputValue] = useState(initial);
    const [focusOnInput, setFocusOnInput] = useState(false);

    const changeInput = (evt) => {
        if (!/^-?\d+$/.test(evt.target.value)) {
            return;
        }

        const value = Number(evt.target.value);

        if (value < min) {
            setInputValue(min);
            return;
        }

        if (value > max) {
            setInputValue(max);
            return;
        }

        setInputValue(value);
    };

    const decrementValue = () => {
        setInputValue((value) => (value === min ? value : value - 1));
    };

    const incrementValue = () => {
        setInputValue((value) => (value === max ? value : value + 1));
    };

    const handleWheel = (evt) => {
        evt.preventDefault();

        if (evt.deltaY > 0) {
            incrementValue();
        } else {
            decrementValue();
        }
    };

    useEffect(() => {
        if (focusOnInput) {
            document.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    });

    useEffect(() => {
        if (typeof cb === 'function') {
            cb(inputValue);
        }
    }, [inputValue, cb]);

    return (
        <div className="numeric-field">
            <button
                className="numeric-field__button numeric-field__button---decrement"
                onClick={decrementValue}
                disabled={inputValue === min}
            >
                -
            </button>
            <input
                className="numeric-field__input"
                type="number"
                value={inputValue}
                onChange={changeInput}
                min={min}
                max={max}
                onFocus={() => setFocusOnInput(true)}
                onBlur={() => setFocusOnInput(false)}
            />
            <button
                className="numeric-field__button numeric-field__button---increment"
                onClick={incrementValue}
                disabled={inputValue === max}
            >
                +
            </button>
        </div>
    );
};

export default NumericField;
