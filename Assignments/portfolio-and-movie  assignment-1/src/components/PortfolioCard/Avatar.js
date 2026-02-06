import './Avatar.css'

function Avatar() {
    return (
        <div className='avatar-container'>
            <img src="/avatar.jpg" alt='profile' className='avatar'/>
            <div className='avatar-boarder'></div>
        </div>
    );
}

export default Avatar