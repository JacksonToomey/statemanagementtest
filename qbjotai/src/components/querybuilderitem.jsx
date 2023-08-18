import { useAtom } from "jotai";
import { useMemo } from "react";
import { filterItemAtom } from "../atoms";
import fields from "../fields.json";
import QueryBuilderControl from "./querybuildrcontrol";

export default function QueryBuilderItem({ index }) {
  const [currentField, setCurrentField] = useAtom(
    useMemo(() => filterItemAtom(index), [index])
  );
  const fieldValues = Object.keys(fields);
  const currentKey = currentField.key;
  const fieldOptions = fields[currentKey];
  const currentValue = currentField.value;
  const handleFieldChange = (evt) => {
    const newKey = evt.target.value;
    const newValue = fields[newKey][0].value;
    setCurrentField({ key: newKey, value: newValue });
  };
  const handleValueChange = (evt) => {
    setCurrentField({ value: evt.target.value });
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