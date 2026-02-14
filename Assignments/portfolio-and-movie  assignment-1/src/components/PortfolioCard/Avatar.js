import './Avatar.css'

function Avatar(props) {
    return (
        <div className='avatar-container'>
            <img src={props.avatarImg} alt='profile' className='avatar'/>
            <div className='avatar-boarder'></div>
        </div>
    );
}

export default Avatar