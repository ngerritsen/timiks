import * as oll from './oll';
import * as pll from './pll';
import ollScrambles from '../data/ollScrambles';
import pllScrambles from '../data/pllScrambles';

export const OLL = 'OLL';
export const PLL = 'PLL';
export const ALGDB_BASE_URL = 'http://algdb.net';
export const types = [OLL, PLL];

export const cases = { [OLL]: oll.cases, [PLL]: pll.cases };
export const categories = { [OLL]: oll.categories, [PLL]: pll.categories };
export const scrambles = { [OLL]: ollScrambles, [PLL]: pllScrambles };
