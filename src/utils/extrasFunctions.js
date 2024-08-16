import { Controller } from "../services/Anroll.js";

export const extractReleaseData = (html) => {
  const jsonString = html
    .split("__NEXT_DATA__")[1]
    .split('type="application/json">')[1]
    .split("</script>")[0];

  const data = JSON.parse(jsonString);

  const updatedData = data.props.pageProps.data.data_releases.map((release) => {
    const { n_episodio } = release.episode;
    const { slug_serie } = release.episode.anime;

    return {
      ...release,
      imageUrl: Controller.imagesEpisodes(slug_serie, n_episodio),
    };
  });

  return JSON.stringify(updatedData);
};

export const extractAnimeData = (html) => {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]*)<\/script>/);

  if (!match || match.length < 2) {
    throw new Error("Não foi possível encontrar o JSON dentro do HTML");
  }

  const jsonString = match[1];
  const data = JSON.parse(jsonString);
  const animeData = data.props.pageProps.data;
  const type = data.query.anime ? "animes" : "filmes";

  const processedData = {
    ...animeData,
    imageUrl: Controller.imagesThumbnail(type, animeData.slug_serie), 
  };

  return JSON.stringify(processedData);
};