import pathToRegexp from 'path-to-regexp';

export const compilePath = (value: string) => pathToRegexp.compile(value);
