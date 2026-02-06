import { useState } from 'react';
import './PortfolioCard.css';
import Footer from './Footer';
import Skills from './Skills';
import Bio from './Bio';  
import Header from './Header';
import ToogleTheme from './ToogleTheme';


const skills = [
    "Design Systems", "React", "TypeScript", "Figma", "Prototyping", "Accessibility"
]

function PortfolioCard(){
    const [isDark, setIsDark] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(128);
    const [page, setPage] = useState(1);

    const toggleDark = () => setIsDark(!isDark);
    const toggleLike = () => {setIsLiked(!isLiked); setLikes(isLiked ? likes-1 : likes + 1)}
    const nextPage = () => {setPage(page%4 + 1)};
    const prevPage = () => setPage( page === 1 ? 4 : page - 1);

    return(
        <div className='PortfolioCard'>
                <div className='Toogle-button'>
                    <ToogleTheme isDark={isDark} toggleDark={toggleDark}/>
                </div>
            <div className={`PortfolioCard-container ${isDark ? "dark" : "light"}`}>
            <div className={`Card ${isDark ? "dark" : "light"}`}>
                <Header/>
                <Bio/>
                <Skills skills={skills} isDark={isDark}/>
                <Footer
                    isDark={isDark}
                    toggleDark={toggleDark}
                    isLiked={isLiked}
                    toggleLike={toggleLike}
                    likes={likes}
                    page={page}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </div>
            </div>
        </div>
    );
}


export default PortfolioCard