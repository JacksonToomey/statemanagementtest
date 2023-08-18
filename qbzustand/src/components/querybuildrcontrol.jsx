import { useStore } from "../store";

export default function QueryBuilderControl({ index }) {
  let bool = useStore((state) => state.bool);
  const update = useStore((state) => state.update);
  const setBool = useStore((state) => state.setBool);
  const currentFilter = useStore((state) => state.filters[index]);
  if (currentFilter.not) {
    bool = "not";
  }

  const makeClickHandler = (value) => () => {
    update(index, { not: false });
    setBool(value);
  };

  const notClickHandler = () => {
    update(index, { not: true });
  };
  return (
    <div>
      {bool === "and" ? (
        "AND"
      ) : (
        <button onClick={makeClickHandler("and")}>AND</button>
      )}
      {bool === "or" ? (
        "OR"
      ) : (
        <button onClick={makeClickHandler("or")}>OR</button>
      )}
      {bool === "not" ? "NOT" : <button onClick={notClickHandler}>NOT</button>}
    </div>
  );
}
