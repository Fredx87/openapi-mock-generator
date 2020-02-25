import { useParams } from "react-router-dom";

export function useCurrentRef(): string {
  const { referenceName } = useParams();
  return decodeURIComponent(referenceName ?? "");
}
