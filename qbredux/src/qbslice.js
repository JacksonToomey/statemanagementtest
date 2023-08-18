import { createSlice } from "@reduxjs/toolkit";
import fieldMap from "./fields.json";

const fieldKeys = Object.keys(fieldMap);

export const qbSlice = createSlice({
  name: "qb",
  initialState: {
    filters: [],
    bool: "and",
  },
  reducers: {
    addFilter: (state) => {
      state.filters.push({
        not: false,
        key: fieldKeys[0],
        value: fieldMap[fieldKeys[0]][0].value,
      });
    },
    setCondition: (state, { payload }) => {
      state.bool = payload;
    },
    setField: (state, { payload }) => {
      const { index, ...newField } = payload;
      const current = state.filters[index];
      state.filters[index] = {
        ...current,
        ...newField,
      };
    },
    setFromExisting: (
      state,
      {
        payload: {
          query: { bool },
        },
      }
    ) => {
      const filters = bool.must || bool.should;
      const excludes = bool.must_not;
      const boolVal = bool.must ? "and" : "or";
      state.bool = boolVal;
      state.filters = [
        ...filters.map((f) => ({
          not: false,
          key: Object.keys(f.match)[0],
          value: f.match[Object.keys(f.match)[0]],
        })),
        ...excludes.map((f) => ({
          not: true,
          key: Object.keys(f.match)[0],
          value: f.match[Object.keys(f.match)[0]],
        })),
      ];
    },
  },
});
export const { actions, reducer } = qbSlice;
export const { addFilter, setCondition, setField, setFromExisting } = actions;
