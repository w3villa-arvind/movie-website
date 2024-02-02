import './movie-list.scss';
import { useEffect, useState } from 'react';
import { getMoviesList } from '../../apiService/axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header';
import Footer from '../Footer/Footer';
import bg from './../../assets/footer-bg.jpg'


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();
    let { pageNo } = useParams();
    pageNo = pageNo ? pageNo : 1
    useEffect(() => {
        const fetchData = async () => {
            try {

                const params = {
                    page: pageNo
                };
                const response = (await getMoviesList(params)).data;
                setTotalPage(response.total_pages)
                setMovies(response.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchData();
    }, [pageNo]);
    const handlePageChange = (newPage) => {
        navigate(`/movieList/page/${newPage}`);
        scrollToTop();
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div>
            <div className="container">
                <Header />
                <div className='list-movie'>
                    {movies.length > 0 && (
                        <div>
                            <ul className="movie-list">
                                {movies.map((movie) => (
                                    <li key={movie.id} className="movie-card">
                                        <Link to={`/movieDetails/${movie.id}`} style={{ textDecoration: 'none' }} onClick={() => scrollToTop()} >
                                            <img
                                                src={movie && movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : bg}
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
                <div className='pagination'>
                    <button onClick={() => handlePageChange(Number(pageNo) - 1)} disabled={Number(pageNo) === 1}>
                        Previous Page
                    </button>
                    <button>{Number(pageNo)}</button> <button>{totalPage}</button>
                    <button onClick={() => handlePageChange(Number(pageNo) + 1)}>Next Page</button>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MovieList; 
