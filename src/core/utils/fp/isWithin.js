import { curry, lte, gte } from 'ramda';

import isNumber from './isNumber';

const isWithin = curry(
  (min, max, value) =>
    isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && lte(value, max),
);

export default isWithin;
