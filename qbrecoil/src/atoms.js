import { atom, selectorFamily } from "recoil";

export const boolState = atom({
  key: "boolState",
  default: "and",
});

export const filterState = atom({
  key: "filterState",
  default: [],
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
