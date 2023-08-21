import { useRecoilValue, useSetRecoilState } from "recoil";
import { esQuerySelector, filterLength, filterState } from "../atoms";
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
  const setFilters = useSetRecoilState(filterState);
  const filterCount = useRecoilValue(filterLength);
  const setExisting = useSetRecoilState(esQuerySelector);
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
    setExisting(existing);
  };
  return (
    <div>
      <button onClick={handleUseExisting}>Use Existing</button>
      <button onClick={handleAddClick}>Add Field</button>
      {[...Array(filterCount)].map((_, i) => (
        <QueryBuilderItem key={`${i}`} index={i} />
      ))}
      <RenderQuery />
    </div>
  );
}
