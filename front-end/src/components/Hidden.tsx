export function Hidden(typeRoom: string) {
  if (typeRoom === "protected") return "inline";
  return "none";
}
