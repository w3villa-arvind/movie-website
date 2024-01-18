import React, { useEffect, useState, useRef } from 'react';
import { useParams ,Link} from 'react-router-dom';
import { getMoviesDetails, getStarCast, getMovieVideos, getSimilarMovies } from '../../apiService/axiosClient';
import Header from '../header/header';
import apiConfig from '../../apiService/apiConfig';
import './movie-details.scss'
import Footer from '../Footer/Footer';

const MovieDetails = () => {
    const { id } = useParams();
    const [item, setItems] = useState(null);
    const [casts, setCast] = useState(null);
    const [movieVideos, setMovieVideos] = useState(null);
    const [similarMovie, setSimilarMovie] = useState(null);

    useEffect(() => {
        const getMovieData = async () => {
            try {
                const response = (await getMoviesDetails(id)).data;
                setItems(response);
            } catch (error) {

            }
        };
        getMovieData();

        const getCastData = async () => {
            try {
                const response = (await getStarCast(id)).data;
                setCast(response.cast.slice(0, 5));
            } catch (error) {

            }
        }
        getCastData();

        const getYoutubeVideos = async () => {
            try {
                const moviesVideo = (await getMovieVideos(id)).data;
                setMovieVideos(moviesVideo.results.slice(0, 4))

            } catch (error) {

            }
        }
        getYoutubeVideos();

        const getsimilarMovieList = async () => {
            try {
                const similarMovies = (await getSimilarMovies(id)).data;
                setSimilarMovie(similarMovies.results.slice(0,10));

            } catch (error) {

            }
        }
        getsimilarMovieList();
    }, [id]);
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
    
    return (
        <>
            {
                item && (
                    <>
                        <div className='container'>
                            <Header />
                            <div className='movie-poster'>
                                <div className='poster-main'>
                                    <div className='mb-3 movie-content'>
                                        <div className="poster-img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                                    </div>
                                </div>
                                <div className='movie-details'>
                                    <h1 className='movie-title'>{item.original_title}</h1>
                                    <div>
                                        <ul>
                                            {item.genres && item.genres.map((genre, i) => (
                                                <li key={i}>{genre.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className='rating-color'> <b>Rating:</b> {item.vote_average}/10 from {item.vote_count} users</p>
                                    </div>
                                    <div>
                                        <p>{item.overview}</p>
                                    </div>
                                    <div>
                                        <h3>Cast</h3>
                                        <div className="casts">
                                            {
                                                casts && casts.map((item, i) => (
                                                    <div key={i} className="image-item">
                                                        <div className="cast-image" style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}></div>
                                                        <p className="cast-title">{item.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='main-video-list'>
                                {movieVideos && movieVideos.map((movieData, index) => (
                                    <Movie key={index} movieData={movieData} />
                                ))}
                            </div>
                            <div className='list-movie'>
                                <h2 >similar movies</h2>
                                {similarMovie && (
                                    <div>
                                        <ul className="movie-list">
                                            {similarMovie.map((movie) => (
                                                <li key={movie.id} className="movie-card">
                                                    <Link to={`/movieDetails/${movie.id}`} style={{ textDecoration: 'none' }} onClick={ () => scrollToTop()} >
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                            alt={movie.original_title}
                                                            className="movie-poster"
                                                        />
                                                        <p className="movie-title">{movie.original_title} ({movie.release_date})</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <Footer />
                        </div>
                    </>
                )
            }
        </>
    );
};

const Movie = props => {
    const iframeRef = useRef(null);
    const dataItem = props.movieData;
    return (
        <div>
            <h2 className='youtubeVideo'>{dataItem.name}</h2>
            <iframe
                height="515"
                src={`https://www.youtube.com/embed/${dataItem.key}`}
                ref={iframeRef}
                width="100%"
                title="video">

            </iframe>
        </div>
    );
};

export default MovieDetails;
