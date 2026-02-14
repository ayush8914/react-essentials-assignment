import './Header.css'
import Avatar from './Avatar';


function Header({ name, role, avatar }){
    return(
        <div className='header-container'>
            <Avatar avatarImg={avatar}/>
            <div className='header-content'>
                <h1 className='name'>{name}</h1>
                <p className='role'>{role}</p>
            </div>
        </div>
    );
}


export default Header