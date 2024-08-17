export const Controller = {
    imagesThumbnail : (type, slug) => `https://static.anroll.net/images/${type}/capas/${slug}.jpg`,
    imagesEpisodes: (slug, number) => `https://static.anroll.net/images/animes/screens/${slug}/${number}.jpg`,
    search: (query) => `https://api-search.anroll.net/data?q=${encodeURIComponent(query)}`,
    realese: () => 'https://www.anroll.net/',
    anime: (generic) => `https://www.anroll.net${generic}`,
    animeEpisodes: (id, page, order) => `https://apiv3-prd.anroll.net/animes/${id}/episodes?page=${page}&order=${order}`,
    m3u8 : () => "https://cdn-zenitsu-gamabunta.b-cdn.net/cf/hls"
  };
  