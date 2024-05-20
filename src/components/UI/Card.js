import './Card.css';

const Card = (props) => {
    return (
        <div className='section'>
            {props.children}
        </div>
    )
}

export default Card;