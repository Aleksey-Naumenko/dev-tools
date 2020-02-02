import { sum, mult } from '../calculator';

it ('sould return the sum on numbs', () => {
    const res = sum(2, 2);
    expect(res).toEqual(4);
});

it ('sould return Nan - no parameter passed', () => {
    const res = sum();
    expect(res).toEqual(NaN);
});

it ('sould return Nan - no parameter passed', () => {
    const res = sum(5, 0);
    expect(res).toEqual(5);
});

it ('sould return res from mult munbs', () => {
    const res = mult(2, 2);
    expect(res).toEqual(4);
});

it ('sould return res from mult munbs', () => {
    const res = mult(2, 0);
    expect(res).toEqual(0);
});