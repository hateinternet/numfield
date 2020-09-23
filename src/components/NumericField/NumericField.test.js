import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, fireEvent } from '@testing-library/react';
import NumericField from './NumericField';

const callback = jest.fn();
const props = {
    initial: 10,
    cb: callback,
    min: 0,
    max: 100,
};
let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        render(<NumericField {...props} />, container);
    });
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('clicks on buttons change input value', () => {
    const field = container.querySelector('.numeric-field__input');
    const decrementButton = container.querySelector('.numeric-field__button---decrement');
    const incrementButton = container.querySelector('.numeric-field__button---increment');

    expect(callback).toHaveBeenCalledWith(10);
    expect(Number(field.value)).toBe(10);

    fireEvent.click(decrementButton);

    expect(callback).toHaveBeenCalledWith(9);
    expect(Number(field.value)).toBe(9);

    fireEvent.click(incrementButton);

    expect(callback).toHaveBeenCalledWith(10);
    expect(Number(field.value)).toBe(10);
});

test('wheel change focused input', () => {
    const field = container.querySelector('.numeric-field__input');

    expect(Number(field.value)).toBe(10);

    fireEvent.focus(field);
    fireEvent.wheel(field, { deltaY: 1 });
    fireEvent.blur(field);

    expect(Number(field.value)).toBe(11);

    fireEvent.focus(field);
    fireEvent.wheel(field, { deltaY: -1 });
    fireEvent.blur(field);

    expect(Number(field.value)).toBe(10);
});
