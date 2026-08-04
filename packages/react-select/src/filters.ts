import memoizeOne from 'memoize-one';
import { stripDiacritics } from './diacritics';

export interface FilterOptionOption<Option> {
  readonly label: string;
  readonly value: string;
  readonly data: Option;
}

interface Config<Option> {
  readonly ignoreCase?: boolean;
  readonly ignoreAccents?: boolean;
  readonly stringify?: (option: FilterOptionOption<Option>) => string;
  readonly trim?: boolean;
  readonly matchFrom?: 'any' | 'start';
}

const memoizedStripDiacriticsForInput = memoizeOne(stripDiacritics);

const trimString = (str: string) => str.replace(/^\s+|\s+$/g, '');
const defaultStringify = <Option>(option: FilterOptionOption<Option>) =>
  { throw new Error("STUB"); };

export const createFilter =
  <Option>(config?: Config<Option>) =>
  (option: FilterOptionOption<Option>, rawInput: string): boolean => {
      throw new Error("STUB");
  };
