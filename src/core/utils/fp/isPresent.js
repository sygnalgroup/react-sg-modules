import isNotPresent from './isNotPresent';

const isPresent = value => !isNotPresent(value);

export default isPresent;
