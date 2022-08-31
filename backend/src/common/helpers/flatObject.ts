export const flatObject = (obj) => {
  function flat(o) {
    return Object.entries(o).flatMap(([key, val]) => {
      if (typeof val === 'object') return flat(val);

      return [[key, val]];
    });
  }

  return Object.fromEntries(flat(obj));
};
