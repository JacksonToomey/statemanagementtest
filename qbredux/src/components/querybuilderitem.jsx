import { useDispatch, useSelector } from "react-redux";
import fields from "../fields.json";
import { setField } from "../qbslice";
import QueryBuilderControl from "./querybuildrcontrol";

export default function QueryBuilderItem({ index }) {
  const fieldValues = Object.keys(fields);
  const dispatch = useDispatch();
  const currentField = useSelector(({ qb }) => qb.filters[index]);
  const currentKey = currentField.key;
  const fieldOptions = fields[currentKey];
  const currentValue = currentField.value;
  const handleFieldChange = (evt) => {
    const newKey = evt.target.value;
    const newValue = fields[newKey][0].value;
    dispatch(
      setField({
        index,
        key: evt.target.value,
        value: newValue,
      })
    );
  };
  const handleValueChange = (evt) => {
    dispatch(
      setField({
        index,
        value: evt.target.value,
      })
    );
  };
  return (
    <div>
      {index > 0 && <QueryBuilderControl index={index} />}
      <div>
        <select
          placeholder="Select Field"
          onChange={handleFieldChange}
          value={currentKey}
        >
          {fieldValues.map((fv) => (
            <option value={fv} key={fv}>
              {fv}
            </option>
          ))}
        </select>
        <select
          disabled={!currentField}
          value={currentValue}
          onChange={handleValueChange}
        >
          {fieldOptions &&
            fieldOptions.map((fo) => (
              <option value={fo.value} key={fo.value}>
                {fo.display}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
