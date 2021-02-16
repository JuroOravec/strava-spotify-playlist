import mapKeys from 'lodash/mapKeys';
import pickBy from 'lodash/pickBy';

/* eslint-disable-next-line @typescript-eslint/ban-types */
const pickPrefixed = <T extends object>(
  obj: T,
  prefix: string
): Partial<Record<string, T[keyof T]>> =>
  mapKeys(
    pickBy(obj, (_, key) => key.startsWith(prefix)),
    (_, key) => key.substring(prefix.length)
  ) ?? {};

export default pickPrefixed;
