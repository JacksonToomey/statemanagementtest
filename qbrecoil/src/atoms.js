import { atom, selector, selectorFamily } from "recoil";

export const boolState = atom({
  key: "boolState",
  default: "and",
});

export const filterState = atom({
  key: "filterState",
  default: [],
});

export const filterLength = selector({
  key: "filterLength",
  get: ({ get }) => {
    return get(filterState).length;
  },
});

export const getFilter = selectorFamily({
  key: "getFilter",
  get:
    (index) =>
    ({ get }) =>
      get(filterState)[index],
  set:
    (index) =>
    ({ set }, update) =>
      set(filterState, (oldState) => [
        ...oldState.slice(0, index),
        {
          ...oldState[index],
          ...update,
        },
        ...oldState.slice(index + 1),
      ]),
});

export const esQuerySelector = selector({
  key: "esQuerySelector",
  get: ({ get }) => {
    const bool = get(boolState);
    const filters = get(filterState);
    const boolKey = bool === "and" ? "must" : "should";
    const includes = filters
      .filter((f) => !f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      }));
    const excludes = filters
      .filter((f) => f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      }));
    return {
      query: {
        bool: {
          [boolKey]: includes,
          must_not: excludes,
        },
      },
    };
  },
  set: ({ set }, existing) => {
    const {
      query: { bool },
    } = existing;
    const boolKey = bool.must ? "and" : "should";
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
    set(boolState, boolKey);
    set(filterState, [...newFilters, ...excludes]);
  },
});
