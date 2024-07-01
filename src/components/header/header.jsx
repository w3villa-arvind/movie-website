import './header.scss'
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';


const Header = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
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
                </div>
            </div>
        </div>
    )
}
export default Header;