export const Controller = {
    imagesThumbnail : (slug) => `https://static.anroll.net/images/animes/capas/${slug}.jpg`,
    imagesEpisodes: (slug, number) => `https://static.anroll.net/images/animes/screens/${slug}/${number}.jpg`,
    search: (query) => `https://api-search.anroll.net/data?q=${encodeURIComponent(query)}`,
    realese: () => 'https://www.anroll.net/'
  };
  