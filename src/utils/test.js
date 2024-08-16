import { Controller } from "../services/Anroll.js";

export const extractDataFromHtml = (html) => {
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
