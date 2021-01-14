type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

const asyncSafeInvoke = async <T>(
  fn: () => T | Promise<T>,
  errCallback: (error: Error) => void | Promise<void> = () => {}
): Promise<{ result: Await<T> | null; error: Error | null }> => {
  let result: Await<T> | null = null;
  let error: Error | null = null;

  try {
    result = (await fn()) as Await<T>;
  } catch (e) {
    error = e;
    await errCallback?.(e);
  }

  return { result, error };
};

const safeInvoke = <T>(
  fn: () => T,
  errCallback: (error: Error) => void = () => {}
): { result: T | null; error: Error | null } => {
  let result: T | null = null;
  let error: Error | null = null;

  try {
    result = fn();
  } catch (e) {
    error = e;
    errCallback?.(e);
  }

  return { result, error };
};

export { safeInvoke, asyncSafeInvoke };
