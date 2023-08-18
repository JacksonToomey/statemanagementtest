import { useAtom } from "jotai";
import { useMemo } from "react";
import { boolAtom, filterItemAtom } from "../atoms";

export default function QueryBuilderControl({ index }) {
  let [bool, setBool] = useAtom(boolAtom);
  const [currentFilter, setCurrentFilter] = useAtom(
    useMemo(() => filterItemAtom(index), [index])
  );
  if (currentFilter.not) {
    bool = "not";
  }

  const makeClickHandler = (value) => () => {
    setCurrentFilter({ not: false });
    setBool(value);
  };

  const notClickHandler = () => {
    setCurrentFilter({ not: true });
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