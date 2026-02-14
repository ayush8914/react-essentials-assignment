import './Bio.css'

function Bio(props){
    return(
        <div className='bio-container'>
            <p className='bio-context'>
                {props.bio}
            </p>
        </div>
    );
}

export default Bio