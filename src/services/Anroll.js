export const Controller = {
    search: (query) => `https://api-search.anroll.net/data?q=${encodeURIComponent(query)}`,
    realese: () => 'https://www.anroll.net/'
  };
  