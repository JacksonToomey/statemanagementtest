import { useRecoilState } from "recoil";
import { boolState, getFilter } from "../atoms";

export default function QueryBuilderControl({ index }) {
  const [filter, setFilter] = useRecoilState(getFilter(index));
  let [bool, setBool] = useRecoilState(boolState);
  if (filter.not) {
    bool = "not";
  }

  const makeClickHandler = (value) => () => {
    setFilter({ not: false });
    setBool(value);
  };

  const notClickHandler = () => {
    setFilter({ not: true });
  };
  return (
    <div>
      {bool === "and" ? (
        <span>AND</span>
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
