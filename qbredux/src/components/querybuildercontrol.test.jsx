import { configureStore } from "@reduxjs/toolkit";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, expect, test } from "vitest";
import { reducer } from "../qbslice";
import QueryBuilderControl from "./querybuildrcontrol";
expect.extend(matchers);

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { qb: reducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

afterEach(() => {
  cleanup();
});

test("renders querybuildercontrol with bool 'AND'", () => {
  renderWithProviders(<QueryBuilderControl index={0} />, {
    preloadedState: {
      qb: {
        bool: "and",
        filters: [{ not: false, key: "foo", value: "foo 1" }],
      },
    },
  });
  const el = screen.getByText("AND");
  expect(el).toContainHTML("<span>AND</span>");
});

test("renders querybuildercontrol with bool 'OR'", () => {
  renderWithProviders(<QueryBuilderControl index={0} />, {
    preloadedState: {
      qb: {
        bool: "or",
        filters: [{ not: false, key: "foo", value: "foo 1" }],
      },
    },
  });
  const el = screen.getByText("AND");
  expect(el).toContainHTML("<button>AND</button>");
});
