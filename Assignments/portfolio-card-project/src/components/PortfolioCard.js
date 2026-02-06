import Header from "./Header";
import Avatar from "./Avatar";
import "./PortfolioCard.css";
import Bio from "./Bio";
import PersonalInfo from "./PersonalInfo";


function PortfolioCard() {
    return (
        <div className="portfolio-card">
            <Header />
            <div className="card-content">
                <Avatar />
                <PersonalInfo />
                <Bio />
            </div>
        </div>
    );
}

export default PortfolioCard;