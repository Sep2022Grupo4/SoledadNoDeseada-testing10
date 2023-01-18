
import { useNavigate } from "react-router-dom";

function CardEvento(props) {

const navigate = useNavigate()

    return (<div className="CardHome">
        <div className="card-home Home">
            <img src={props.image} alt="Image" />
            <div className="sub-card">
                <div className="sub-card-text-container">
                    <p className="card-title">{props.title}</p>
                    <p className="card-subtitle">{props.date}</p>
                </div>
            </div>
        </div>
    </div>)
}

export default CardEvento;