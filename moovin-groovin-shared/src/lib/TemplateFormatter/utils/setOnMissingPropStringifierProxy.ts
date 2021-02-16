const isObjectLike = (val: unknown) =>
  val != null && ['object', 'function'].includes(typeof val);

const setToStringMethod = (obj: Record<string, unknown>, value: any): void =>
  Object.defineProperty(obj, 'toString', {
    value: () => (typeof value === 'string' ? value : `${value}`),
    writable: false,
    enumerable: false,
  });

/**
 * Create proxy that maps all keys of any depth (proxy.lol or proxy.w.h.a.t)
 * to itself, so when that prop is turned to string, it renders the missing
 * value placeholder.
 */
const createMissingValueProxy = (
  missingValue?: unknown
): Record<string, unknown> => {
  const missingValueProxy: any = new Proxy(
    {},
    {
      get: function (target, prop, receiver) {
        if (prop === Symbol.toPrimitive) {
          return () =>
            isObjectLike(missingValue) ? missingValue + '' : missingValue;
        }
        if (prop === Symbol.iterator) {
          return (missingValue as any)?.[Symbol.iterator];
        }
        if (prop === 'toString') return Reflect.get(target, prop, receiver);
        return missingValueProxy;
      },
      // Trap `prop in target` syntaax and lie about the keys so that access
      // to non-existent keys will redirect the accessor to missingValueProxy.
      has: function (target, prop) {
        return true;
      },
      // Trap `Object.prototype.hasOwnProperty` and lie about the keys so that
      // access to non-existent keys will redirect the accessor to missingValueProxy.
      getOwnPropertyDescriptor: function (target, prop) {
        if (!Reflect.has(target, prop)) {
          return { configurable: true, enumerable: true };
        }
        return Reflect.getOwnPropertyDescriptor(target, prop);
      },
    }
  );
  setToStringMethod(missingValueProxy, missingValue);
  return missingValueProxy;
};

/**
 * Create function for creating deep proxies that redirect to missingValueProxy
 * on invalid props.
 */
const createProxifier = (missingValue?: unknown) => {
  const missingValueProxy = createMissingValueProxy(missingValue);

  /* eslint-disable-next-line @typescript-eslint/ban-types */
  const proxifyObject = <T extends object | ((...args: any[]) => any)>(
    obj: T,
    wraps: unknown = missingValue
  ): T =>
    new Proxy(obj, {
      get: function (target, prop, receiver) {
        if (prop === Symbol.toPrimitive) {
          return () => (isObjectLike(wraps) ? wraps + '' : wraps);
        }
        if (prop === Symbol.iterator) {
          return (wraps as any)?.[Symbol.iterator];
        }
        if (prop === 'toString') return Reflect.get(target, prop, receiver);
        if (!Reflect.has(target, prop)) return missingValueProxy;
        const propVal = Reflect.get(target, prop, receiver);
        if (isObjectLike(propVal)) {
          return proxifyObject(propVal, propVal);
        }
        const proxiedVal = proxifyObject({}, propVal);
        setToStringMethod(proxiedVal, propVal);
        return proxiedVal;
      },
      has: function (target, prop) {
        // We lie about the keys so that access to non-existent keys will redirect
        // the accessor to missingValueProxy;
        return true;
      },
      // Trap `Object.prototype.hasOwnProperty` and lie about the keys so that
      // access to non-existent keys will redirect the accessor to missingValueProxy.
      getOwnPropertyDescriptor: function (target, prop) {
        if (!Reflect.has(target, prop)) {
          return { configurable: true, enumerable: true };
        }
        return Reflect.getOwnPropertyDescriptor(target, prop);
      },
    });

  return proxifyObject;
};

/**
 * Create a deep proxy of `obj`. Then, when trying to _stringify_ an invalid prop
 * at any depth (obj.this.path.does.not.exist), then, instead, the `missingValue`
 * will be stringified.
 *
 * **Note:**
 *
 * Normally, invalid prop returns `undefined`.
 *
 * Proxied objects, INSTEAD, return another proxy that, _if stringified_, returns
 * stringified `missingValue`.
 *
 * So, any proxified object is NOT SUITABLE for FALSY property comparison, e.g.
 * `obj?.a?.b?.c`,
 * because each property will always be TRUTHY.
 *
 * @example
 * obj = {a: 1, b: { c: '4' }};
 * p = setOnMissingPropStringifierProxy(obj, 'Whoopsie!');
 * console.log(p.a); // 1
 * console.log(p.b); // { c: '4' ;}
 * console.log(p.c); // 'Whoopsie!'
 * console.log(p.b.c); // '4'
 * console.log(p.b.d); // 'Whoopsie!'
 * console.log(p.b.c.d.ef.g.f.i); // 'Whoopsie!'
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
const setOnMissingPropStringifierProxy = <T extends object>(
  obj: T,
  missingValue?: unknown
): T => {
  const proxifyObject = createProxifier(missingValue);

  // Proxify the object so any invalid props redirect to missingValueProxy.
  const proxy: T = proxifyObject(obj, obj);

  return proxy;
};

export default setOnMissingPropStringifierProxy;
