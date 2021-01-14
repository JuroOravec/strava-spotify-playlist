import isNil from 'lodash/isNil';

interface PropsOptions {
  ignorePrototypes?: unknown[];
}

const arrayFromSet = <T>(set: Set<T>): T[] => Array.from(set.values());

/** Get all props on an object */
const props = (obj: unknown, options: PropsOptions = {}): string[] => {
  const { ignorePrototypes = [] } = options;

  const props = new Set<string>();

  if (isNil(obj)) return arrayFromSet(props);

  let currPrototype = obj;
  while (!isNil(currPrototype)) {
    if (!ignorePrototypes.includes(currPrototype)) {
      const objProps = Object.getOwnPropertyNames(currPrototype);
      objProps.forEach((prop) => props.add(prop));
    }
    currPrototype = Object.getPrototypeOf(currPrototype);
  }
  return arrayFromSet(props);
};

export default props;
