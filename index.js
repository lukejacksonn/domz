const cache = new Map();
export default h =>
  new Proxy(
    {},
    {
      get: (target, name) => cache.get(name) || cache.set(name, (...args) =>
        args[0] && typeof args[0] === "object" && !Array.isArray(args[0])
          ? h(name, ...args)
          : h(name, {}, ...args)).get(name)
    }
  );
