import { useStore } from "../store";
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
  const setExisting = useStore((state) => state.setExisting);
  const add = useStore((state) => state.add);
  const filters = useStore((state) => state.filters);
  const handleAddClick = () => {
    add();
  };
  const handleUseExisting = () => {
    setExisting(existing);
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
