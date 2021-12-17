import { isEmpty, isNil } from 'ramda';

const isNotPresent = value => isNil(value) || isEmpty(value) || !`${value}`.trim();

export default isNotPresent;
