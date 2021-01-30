const deserializeState = (val: string): any =>
  JSON.parse(decodeURIComponent(val));

const serializeState = (val: unknown): string =>
  encodeURIComponent(JSON.stringify(val));

export { serializeState, deserializeState };
