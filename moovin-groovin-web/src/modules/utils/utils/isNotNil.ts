import isNil from 'lodash/isNil';

const isNotNil = <T extends any>(val: T): val is Exclude<T, null | undefined | void> => !isNil(val);

export default isNotNil;
