import matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { useStore } from "../store";
import QueryBuilderControl from "./querybuildrcontrol";

expect.extend(matchers);

const initialState = useStore.getState();
afterEach(() => {
  cleanup();
  useStore.setState(initialState, true);
});

test("renders querybuildercontrol with bool 'AND'", () => {
  useStore.setState({
    bool: "and",
    filters: [
      {
        not: true,
        key: "foo",
        value: "foo 1",
      },
    ],
  });
  render(<QueryBuilderControl index={0} />);
});

test("renders querybuildercontrol with bool 'OR'", () => {
  useStore.setState({
    bool: "or",
    filters: [
      {
        not: true,
        key: "foo",
        value: "foo 1",
      },
    ],
  });
  render(<QueryBuilderControl index={0} />);
});
