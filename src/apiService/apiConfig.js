const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'a9f61458ab61820073ed46219d9c81a9',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;