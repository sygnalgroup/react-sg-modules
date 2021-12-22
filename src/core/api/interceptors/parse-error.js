import { buildError } from '../api-error';

const parseError = (error) => Promise.reject(buildError(error.response));

export default parseError;
