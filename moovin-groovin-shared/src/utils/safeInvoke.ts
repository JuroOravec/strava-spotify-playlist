type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

const asyncSafeInvoke = async <
  T,
  TErrCallback extends ((error: Error) => void) | ((error: Error) => never)
>(
  fn: () => T | Promise<T>,
  errCallback?: TErrCallback
): Promise<{
  result: Await<TErrCallback extends (error: Error) => never ? T : T | null>;
  error: Error | null;
}> => {
  let result: Await<T> | null = null;
  let error: Error | null = null;

  try {
    result = (await fn()) as Await<T>;
  } catch (e) {
    error = e;
    await errCallback?.(e);
  }

  return { result: result as any, error };
};

const safeInvoke = <
  T,
  TErrCallback extends ((error: Error) => void) | ((error: Error) => never)
>(
  fn: () => T,
  errCallback?: TErrCallback
): {
  result: TErrCallback extends (error: Error) => never ? T : T | null;
  error: Error | null;
} => {
  let result: T | null = null;
  let error: Error | null = null;

  try {
    result = fn();
  } catch (e) {
    error = e;
    errCallback?.(e);
  }

  return { result: result as any, error };
};

export { safeInvoke, asyncSafeInvoke };
