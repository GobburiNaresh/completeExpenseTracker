import Mainpage from '../Images/Mainpage.jpg';
import classes from './MainImage.module.css';

const MainImage = () => {
    return(
        <div>
             <img className={classes.Mainpage} src={Mainpage} alt='Mainpage'/>
        </div>
    )
}

export default MainImage;