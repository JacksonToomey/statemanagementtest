import { useDispatch, useSelector } from "react-redux";
import { setCondition, setField } from "../qbslice";

export default function QueryBuilderControl({ index }) {
  const bool = useSelector((state) => {
    const currentField = state.qb.filters[index];
    if (currentField.not) return "not";
    return state.qb.bool;
  });
  const dispatch = useDispatch();
  const makeClickHandler = (value) => () => {
    dispatch(
      setField({
        index,
        not: false,
      })
    );
    dispatch(setCondition(value));
  };

  const notClickHandler = () => {
    dispatch(
      setField({
        index,
        not: true,
      })
    );
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
