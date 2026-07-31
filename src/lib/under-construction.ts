/** Path prefixes that show the under-construction treatment. */
export const UNDER_CONSTRUCTION_PATHS = [
  "/honor/the-path",
  "/honor/role-models",
  "/honor/world-conquest",
] as const;

export function isUnderConstruction(pathname: string): boolean {
  return UNDER_CONSTRUCTION_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
