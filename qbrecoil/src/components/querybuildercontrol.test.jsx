import matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import QueryBuilderControl from "./querybuildrcontrol";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});


test("renders querybuildercontrol with bool 'AND'", () => {
  render(<QueryBuilderControl index={0} />);
});

test("renders querybuildercontrol with bool 'OR'", () => {
  render(<QueryBuilderControl index={0} />);
});
