export function removeTrailingSlash(url: string) {
  const clearedURL = url.endsWith('/')
    ? url.slice(0, -1)
    : url;

  return clearedURL;
}

export function removeStartingSlash(url: string) {
  const clearedURL = url.startsWith('/')
    ? url.slice(1)
    : url;

  return clearedURL;
}

export function removeMultipleSlashes(url: string) {
  const clearedURL = url.replace(/\/+/g, '/');

  return clearedURL;
}