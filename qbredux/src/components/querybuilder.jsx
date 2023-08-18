import { useDispatch, useSelector } from "react-redux";
import { addFilter, setFromExisting } from "../qbslice";
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
  const dispatch = useDispatch();
  const handleAddClick = () => {
    dispatch(addFilter());
  };
  const handleUseExisting = () => {
    dispatch(setFromExisting(existing));
  };
  const filters = useSelector((state) => state.qb.filters);
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
