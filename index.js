const cache = {};
export default h => {
  const vnodeProps = Object.keys(h("div", {}, "test"));
  const isVnode = obj => {
    const keys = Object.keys(obj);
    return vnodeProps.every(key => keys.includes(key));
  };
  return new Proxy(
    {},
    {
      get: (target, name) => cache[name] || (cache[name] = (...args) =>
        typeof args[0] === "object" && !Array.isArray(args[0]) && !isVnode(args[0])
          ? h(name, ...args)
          : h(name, {}, ...args))
    }
  );
};
