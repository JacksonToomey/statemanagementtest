import { useSelector } from "react-redux";
export default function RenderQuery() {
  const boolKey = useSelector((state) =>
    state.qb.bool === "and" ? "must" : "should"
  );
  const filters = useSelector((state) =>
    state.qb.filters
      .filter((f) => !f.not)
      .map((f) => ({
        match: {
          [f.key]: f.value,
        },
      }))
  );
  const excludes = useSelector((state) =>
    state.qb.filters
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
