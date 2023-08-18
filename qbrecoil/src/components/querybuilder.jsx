import { useRecoilState } from "recoil";
import { boolState, filterState } from "../atoms";
import fieldMap from "../fields.json";
import QueryBuilderItem from "./querybuilderitem";
import RenderQuery from "./renderquery";

const existing = {
  query: {
    bool: {
      should: [
        {
          match: {
            foo: "foo 2",
          },
        },
        {
          match: {
            bar: "bar 1",
          },
        },
      ],
      must_not: [
        {
          match: {
            bat: "bat 2",
          },
        },
      ],
    },
  },
};

export default function QueryBuilder() {
  const [filters, setFilters] = useRecoilState(filterState);
  const [, setBoolState] = useRecoilState(boolState);
  const handleAddClick = () => {
    setFilters((oldFilters) => [
      ...oldFilters,
      {
        not: false,
        key: Object.keys(fieldMap)[0],
        value: fieldMap[Object.keys(fieldMap)[0]][0].value,
      },
    ]);
  };
  const handleUseExisting = () => {
    const bool = existing.query.bool;
    const newBool = bool.must ? "and" : "or";
    const filters = bool.must || bool.should;
    const newFilters = filters.map((f) => ({
      not: false,
      key: Object.keys(f.match)[0],
      value: f.match[Object.keys(f.match)[0]],
    }));
    const excludes = bool.must_not.map((f) => ({
      not: true,
      key: Object.keys(f.match)[0],
      value: f.match[Object.keys(f.match)[0]],
    }))
    setFilters([
      ...newFilters,
      ...excludes,
    ]);
    setBoolState(newBool);
  };
  return (
    <div>
      <button onClick={handleUseExisting}>Use Existing</button>
      <button onClick={handleAddClick}>Add Field</button>
      {filters.map((_, i) => (
        <QueryBuilderItem key={`${i}`} index={i} />
      ))}
      <RenderQuery />
    </div>
  );
}
