import { Controller } from "../services/Anroll.js";

export const extractDataFromHtml = (html) => {
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
