import zip from 'lodash/zip';

const alignResultWithInput = <
  TInput,
  TResult,
  TMissing,
  TAlignBy extends string | number
>(data: {
  input: { value: TInput[]; alignBy: (val: TInput) => TAlignBy };
  result: { value: TResult[]; alignBy: (val: TResult) => TAlignBy };
  missing: TMissing;
}): (TResult | TMissing)[] => {
  const { input, result, missing } = data;
  const resultByKeys = result.value.reduce((obj, item) => {
    obj[result.alignBy(item)] = item;
    return obj;
  }, {} as Record<TAlignBy, TResult>);

  const [_, orderedResult] = zip(
    ...input.value.map(
      (item) =>
        [item, resultByKeys[input.alignBy(item)] ?? missing] as [
          TInput,
          TResult | TMissing
        ]
    )
  ) as [TInput[], (TResult | TMissing)[]];

  return orderedResult;
};

export default alignResultWithInput;
