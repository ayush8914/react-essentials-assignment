import './Header.css'
import Avatar from './Avatar';


function Header(){
    return(
        <div className='header-container'>
            <Avatar/>
            <div className='header-content'>
                <h1 className='name'>Ayush Gevariya</h1>
                <p className='role'>Software Engineer & Developer</p>
            </div>
        </div>
    );
}


export default Header