/**
 * Creates a URL by combining pathname and search params
 */
export const createUrl = (
  pathname: string,
  params: URLSearchParams,
): string => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

/**
 * Ensures a string starts with a specified prefix
 */
export const ensureStartsWith = (
  stringToCheck: string,
  startsWith: string,
): string =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

/**
 * No required runtime environment variables are needed for the demo storefront.
 */
export const validateEnvironmentVariables = (): void => {
  return;
};
