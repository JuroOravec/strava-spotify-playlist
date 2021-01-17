import isNil from 'lodash/isNil';

import getProps from './props';

interface DestructurableOptions {
  props?: string[];
}

/** Make copy of given object that can be destructured without losing 'this' context */
const destructurable = <T>(val: T, options: DestructurableOptions = {}): T => {
  if (isNil(val)) return val;

  const { props: selectProps = [] } = options;

  const boundCopy = {} as Record<string, any>;
  getProps(val, {
    ignorePrototypes: [Object.getPrototypeOf({})],
  })
    .filter((prop) => selectProps.includes(prop))
    .forEach((prop: any) => {
      const currVal = (val as any)[prop];
      boundCopy[prop] =
        typeof currVal === 'function' ? currVal.bind(val) : currVal;
    });

  return boundCopy as T;
};

export default destructurable;
