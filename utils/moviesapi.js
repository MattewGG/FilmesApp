import { movieapikey } from "./apikey";
import axios from "axios";

// Endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieapikey}&language=pt-BR`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${movieapikey}&language=pt-BR`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieapikey}&language=pt-BR`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${movieapikey}&language=pt-BR`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list?api_key=${movieapikey}&language=pt-BR`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${movieapikey}&language=pt-BR`;

// Endpoint para detalhes do filme
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${movieapikey}&language=pt-BR`;

const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${movieapikey}&language=pt-BR`;

const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${movieapikey}&language=pt-BR`;

// Chamada para detalhes da pessoa (elenco)
const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${movieapikey}&language=pt-BR`;

const personMovieEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${movieapikey}&language=pt-BR`;

// Função para chamada da API de filmes
const movieApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// Função para retornar a imagem do poster dos filmes
export const image500 = (posterpath) =>
  posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;

// Funções para chamadas de filmes
export const fetchTrendingMovie = () => {
  return movieApiCall(trendingMoviesEndpoint);
};

export const fetchPopularMovie = () => {
  return movieApiCall(popularMoviesEndpoint);
};

export const fetchUpComingMovie = () => {
  return movieApiCall(upComingMoviesEndpoint);
};

export const fetchTopRatedMovie = () => {
  return movieApiCall(topRatedMoviesEndpoint);
};

export const fetchGenres = () => {
  return movieApiCall(genresEndpoint);
};

export const fetchMovieDetails = (id) => {
  return movieApiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (movieId) => {
  return movieApiCall(movieCreditsEndpoint(movieId));
};

export const fetchSimilarMovies = (movieId) => {
  return movieApiCall(similarMoviesEndpoint(movieId));
};

export const searchMovies = (params) => {
  return movieApiCall(searchMoviesEndpoint, params);
};

// Funções para detalhes de pessoas (elenco)
export const fetchPersonDetails = (id) => {
  return movieApiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return movieApiCall(personMovieEndpoint(id));
};
