import './header.scss'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };
    const homePage = () => {
        navigate('/movieList');
    }

    const handleClick = () => {
        if (!inputValue) {
            return;
        }
        navigate(`/search/${inputValue}`);
    }

    return (
        <div>
            <div className="search-box">
                <div className='website-title' onClick={() => homePage()} >MOVIESCLONE</div>
                <div className='search-bar'>
                    <input
                        type="text"
                        className='movie-input'
                        value={inputValue}
                        placeholder='what are you lookin for?'
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className='search-btn' onClick={handleClick}>
                        Search
                    </div>
                </div>
                <div>
                    <button onClick={handleLogoutClick} className='logout-buttom'> <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>logout</Link></button>
                </div>
            </div>
        </div>
    )
}
export default Header;