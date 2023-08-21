import { useAtomValue } from "jotai";
import { esQueryAtom } from "../atoms";

export default function RenderQuery() {
  const query = useAtomValue(esQueryAtom);
  return <pre>{JSON.stringify(query, undefined, 2)}</pre>;
}
