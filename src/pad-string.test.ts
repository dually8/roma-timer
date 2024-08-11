import { expect, test } from 'vitest';
import { padString } from './pad-string';

test('pads 1 with 01', () => {
    const expected = '01';
    const actual = padString('1');
    expect(actual).toBe(expected);
});
test('pads 0 with 00', () => {
    const expected = '00';
    const actual = padString('0');
    expect(actual).toBe(expected);
});
