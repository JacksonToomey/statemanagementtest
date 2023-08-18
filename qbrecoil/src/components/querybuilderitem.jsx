import { useRecoilState } from "recoil";
import { getFilter } from "../atoms";
import fields from "../fields.json";
import QueryBuilderControl from "./querybuildrcontrol";

export default function QueryBuilderItem({ index }) {
  const [filter, setFilter] = useRecoilState(getFilter(index));
  const fieldValues = Object.keys(fields);
  const currentField = filter;
  const currentKey = currentField.key;
  const fieldOptions = fields[currentKey];
  const currentValue = currentField.value;
  const handleFieldChange = (evt) => {
    const newKey = evt.target.value;
    const newValue = fields[newKey][0].value;
    setFilter({
      key: newKey,
      value: newValue,
    });
  };
  const handleValueChange = (evt) => {
    setFilter({
      value: evt.target.value,
    });
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
