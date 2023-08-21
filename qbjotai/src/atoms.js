import { atom } from "jotai";

export const boolAtom = atom("and");

export const filterAtom = atom([]);

export const filterItemAtom = (index) =>
  atom(
    (get) => get(filterAtom)[index],
    (get, set, update) => {
      const current = get(filterAtom)[index];
      set(filterAtom, (old) => [
        ...old.slice(0, index),
        {
          ...current,
          ...update,
        },
        ...old.slice(index + 1),
      ]);
    }
  );

export const filterSizeAtom = atom((get) => get(filterAtom).length);

export const esQueryAtom = atom(
  (get) => {
    const boolKey = get(boolAtom);
    const bool = boolKey === "and" ? "must" : "should";
    const filters = get(filterAtom)
      .filter((f) => !f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      }));
    const excludes = get(filterAtom)
      .filter((f) => f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      }));
    return {
      query: {
        bool: {
          [bool]: filters,
          must_not: excludes,
        },
      },
    };
  },
  (get, set, { query: { bool } }) => {
    const boolKey = bool.must ? "and" : "or";
    const filters = bool.must || bool.should;
    const newFilters = filters.map((f) => ({
      not: false,
      key: Object.keys(f.match)[0],
      value: f.match[Object.keys(f.match)[0]],
    }));
    const excludes = bool.must_not.map((f) => ({
      not: true,
      key: Object.keys(f.match)[0],
      value: f.match[Object.keys(f.match)[0]],
    }));
    set(boolAtom, boolKey);
    set(filterAtom, [...newFilters, ...excludes]);
  }
);
