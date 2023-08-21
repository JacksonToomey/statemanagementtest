import matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { afterEach, expect, test } from "vitest";
import { boolAtom, filterAtom } from "../atoms";
import QueryBuilderControl from "./querybuildrcontrol";

expect.extend(matchers);

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

afterEach(() => {
  cleanup();
});

test("renders querybuildercontrol with bool 'AND'", () => {
  render(
    <TestProvider
      initialValues={[
        [boolAtom, "and"],
        [
          filterAtom,
          [
            {
              not: false,
              key: "foo",
              value: "foo 1",
            },
          ],
        ],
      ]}
    >
      <QueryBuilderControl index={0} />
    </TestProvider>
  );
  const el = screen.getByText("AND");
  expect(el).toContainHTML("<span>AND</span>");
});

test("renders querybuildercontrol with bool 'OR'", () => {
  render(
    <TestProvider
      initialValues={[
        [boolAtom, "or"],
        [
          filterAtom,
          [
            {
              not: false,
              key: "foo",
              value: "foo 1",
            },
          ],
        ],
      ]}
    >
      <QueryBuilderControl index={0} />
    </TestProvider>
  );
  const el = screen.getByText("AND");
  expect(el).toContainHTML("<button>AND</button>");
});
