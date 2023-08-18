import { atom, useAtomValue } from "jotai";
import { boolAtom, filterAtom } from "../atoms";

const boolKeyAtom = atom((get) =>
  get(boolAtom) === "and" ? "must" : "should"
);

const filtersAtom = atom((get) =>
  get(filterAtom)
    .filter((f) => !f.not)
    .map((f) => ({
      match: {
        [f.key]: f.value,
      },
    }))
);

const excludesAtom = atom((get) =>
  get(filterAtom)
    .filter((f) => f.not)
    .map((f) => ({
      match: {
        [f.key]: f.value,
      },
    }))
);

export default function RenderQuery() {
  const boolKey = useAtomValue(boolKeyAtom);
  const filters = useAtomValue(filtersAtom);
  const excludes = useAtomValue(excludesAtom);
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