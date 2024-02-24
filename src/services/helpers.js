function generateUrlWithSearchParams(href = '', searchParams = {}) {
  const url = new URL(href);
  const urlSearchParams = url.searchParams;
  for (const [key, value] of Object.entries(searchParams)) {
    urlSearchParams.set(key, value.toString());
  }
  return url;
}

export {
  generateUrlWithSearchParams,
}