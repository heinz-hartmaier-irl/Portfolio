export function creationAssetUrl(relativePath: string) {
  const encodedSegments = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/creation-assets/${encodedSegments}`;
}
