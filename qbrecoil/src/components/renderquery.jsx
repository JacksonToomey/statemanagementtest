import { selector, useRecoilValue } from "recoil";
import { boolState, filterState } from "../atoms";

const boolKeySelector = selector({
  key: "boolKeySelector",
  get: ({ get }) => {
    return get(boolState) === "and" ? "must" : "should";
  },
});

const filterSelecter = selector({
  key: "filterSelector",
  get: ({ get }) =>
    get(filterState)
      .filter((f) => !f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      })),
});
const excludeSelector = selector({
  key: 'excludeSelector',
  get: ({ get }) =>
    get(filterState)
      .filter((f) => f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      })),
})
export default function RenderQuery() {
  const boolKey = useRecoilValue(boolKeySelector);
  const filters = useRecoilValue(filterSelecter);
  const excludes = useRecoilValue(excludeSelector);
  return (
    <pre>
      {JSON.stringify(
        {
          query: {
            bool: {
              [boolKey]: filters,
              must_not: excludes,
            },
          },
        },
        undefined,
        2
      )}
    </pre>
  );
}
