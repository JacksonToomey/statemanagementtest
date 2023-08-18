import { useStore } from "../store";

export default function RenderQuery() {
  const boolKey = useStore((state) =>
    state.bool === "and" ? "must" : "should"
  );
  const filters = useStore((state) =>
    state.filters
      .filter((f) => !f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      }))
  );
  const excludes = useStore((state) =>
    state.filters
      .filter((f) => f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      }))
  );
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
