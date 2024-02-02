import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { searchMovies } from "../../apiService/axiosClient";
import Header from "../header/header";
import Footer from "../Footer/Footer";
import bg from './../../assets/footer-bg.jpg'

const CustomList = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    let { pageNo } = useParams();
    pageNo = pageNo ? pageNo : 1
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleSearch = async () => {
        try {
            let data = {
                query: query,
                pageNo: pageNo
            }
            const movie = (await searchMovies(data)).data;
            setMovies(movie.results);
            setTotalPage(movie.total_pages)
        } catch (error) {

        }
    }

    useEffect(() => {
        handleSearch();
    }, [query, pageNo]);

    const handlePageChange = (newPage) => {
        navigate(`/search/${query}/page/${newPage}`);
        scrollToTop();

    };

    return (
        <>
            <div className="container">
                <Header />
                {movies.length ? (
                    <>
                        <ul className="movie-list">
                            {movies.map((movie) => (
                                <li key={movie.id} className="movie-card">
                                    <Link to={`/movieDetails/${movie.id}`} style={{ textDecoration: 'none' }} onClick={() => scrollToTop()}>
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
                        <div className='pagination'>
                            <button onClick={() => handlePageChange(Number(pageNo) - 1)} disabled={Number(pageNo) === 1}>
                                Previous Page
                            </button>
                            <button>{Number(pageNo)}</button> <button>{totalPage}</button>
                            <button onClick={() => handlePageChange(Number(pageNo) + 1)}>Next Page</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="main-not-found">
                            <div className="notFound">
                                <p>No data found</p>
                            </div>
                        </div>
                    </>
                )
                }

                <Footer />
            </div>
        </>
    )
}

export default CustomList; 