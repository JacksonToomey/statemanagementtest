import { useRecoilValue } from "recoil";
import { esQuerySelector } from "../atoms";


export default function RenderQuery() {
  const query = useRecoilValue(esQuerySelector);
  return (
    <pre>
      {JSON.stringify(
        query,
        undefined,
        2
      )}
    </pre>
  );
}
