import matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { afterEach, expect, test } from "vitest";
import { boolState, filterState } from "../atoms";
import QueryBuilderControl from "./querybuildrcontrol";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});


test("renders querybuildercontrol with bool 'AND'", () => {
  const initialize = (snapshot) => {
    snapshot.set(boolState, 'and');
    snapshot.set(filterState, [{not: false, key: 'foo', value: 'foo 1'}])
  }
  render(
    <RecoilRoot initializeState={initialize}>
      <QueryBuilderControl index={0} />
    </RecoilRoot>
  );
  const el = screen.getByText("AND");
  expect(el).toContainHTML("<span>AND</span>");
});

test("renders querybuildercontrol with bool 'OR'", () => {
  const initialize = (snapshot) => {
    snapshot.set(boolState, 'or');
    snapshot.set(filterState, [{not: false, key: 'foo', value: 'foo 1'}])
  }
  render(
    <RecoilRoot initializeState={initialize}>
      <QueryBuilderControl index={0} />
    </RecoilRoot>
  );
  const el = screen.getByText("AND");
  expect(el).toContainHTML("<button>AND</button>");
});
