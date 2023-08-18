import { useAtomValue, useSetAtom } from "jotai";
import { boolAtom, filterAtom, filterSizeAtom } from "../atoms";
import fieldMap from '../fields.json';
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
  const setFilters = useSetAtom(filterAtom);
  const setBool = useSetAtom(boolAtom);
  const filterSize = useAtomValue(filterSizeAtom);
  const handleAddClick = () => {
    setFilters((old) => [...old, {
      not: false,
      key: Object.keys(fieldMap)[0],
      value: fieldMap[Object.keys(fieldMap)[0]][0].value,
    }])
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
    }));
    setBool(newBool);
    setFilters([...newFilters, ...excludes]);
  };
  return (
    <div>
      <button onClick={handleUseExisting}>Use Existing</button>
      <button onClick={handleAddClick}>Add Field</button>
      {[...Array(filterSize)].map((_, i) => (
        <QueryBuilderItem key={`${i}`} index={i} />
      ))}
      <RenderQuery />
    </div>
  );
}