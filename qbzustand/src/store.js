import { create } from "zustand";
import fieldMap from "./fields.json";

export const useStore = create((set) => ({
  bool: "and",
  filters: [],
  setExisting: (existing) =>
    set(() => {
      const bool = existing.query.bool;
      const newBool = bool.must ? "and" : "or";
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
      return {
        bool: newBool,
        filters: [...newFilters, ...excludes],
      };
    }),
  add: () =>
    set((state) => {
      const key = Object.keys(fieldMap)[0];
      const value = fieldMap[key][0].value;
      return {
        filters: [
          ...state.filters,
          {
            not: false,
            key,
            value,
          },
        ],
      };
    }),
  update: (index, update) =>
    set((state) => ({
      filters: [
        ...state.filters.slice(0, index),
        {
          ...state.filters[index],
          ...update,
        },
        ...state.filters.slice(index + 1),
      ],
    })),
  setBool: (newBool) =>
    set(() => ({
      bool: newBool,
    })),
}));
