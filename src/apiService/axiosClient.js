import axios from 'axios';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
});
//  const movieUrl = '/movies?api_key='+apiConfig.apiKey
export const loginAPI = async (data) => axiosClient.post('https://reqres.in/api/login', data);
export const signUp = async (data) => axiosClient.post('https://reqres.in/api/register', data);
export const getMoviesList = async (data) => axiosClient.get('discover/movie?sort_by=popularity.desc&page=' + data.page + '&api_key=' + apiConfig.apiKey);
export const getMoviesDetails = async (id) => axiosClient.get('movie/' + id + '?api_key=' + apiConfig.apiKey);
export const getStarCast = async (id) => axiosClient.get('movie/' + id + '/credits?api_key=' + apiConfig.apiKey);
export const getMovieVideos = async (id) => axiosClient.get('movie/' + id + '/videos?api_key=' + apiConfig.apiKey);
export const getSimilarMovies = async (id) => axiosClient.get('movie/' + id + '/similar?api_key=' + apiConfig.apiKey);
export const searchMovies = async (data) => axiosClient.get('search/movie?query=' + data.query + '&page=' + data.pageNo + '&api_key=' + apiConfig.apiKey);


export default axiosClient;