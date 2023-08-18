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
