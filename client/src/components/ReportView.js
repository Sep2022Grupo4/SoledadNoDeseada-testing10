import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportView(props) {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [element, setElement] = useState("")
    const [volunteer, setVolunteer] = useState("")
    useEffect(()=>{
        async function desarmar(){
            let usr = await props.element
            setUser(usr.user)
            setElement(usr.element)
            setVolunteer(usr.volunteer)
        }
        desarmar();
    })


    return (<div className="ReportView">
        <div className="top-report">
            <img className="imgReport" src={`/Images/${user.avatar}`} alt="Image" />
            <p className="card-title">{user.first_name} {user.last_name}</p>
        </div>
            {!show && <div className="DropDown-btn" onClick={()=>setShow(true)}><p>ver reporte</p><FontAwesomeIcon icon={faChevronDown} /></div>}
        {show &&
            <div className="sub-report">
                <p className="description">{element.description_}</p>
                <p><strong> Enviado por:</strong> {volunteer.first_name} {volunteer.last_name}</p>
                <div className="sub-button" onClick={()=>setShow(false)}><FontAwesomeIcon icon={faChevronUp} /></div>
            </div>}
    </div>)
}

export default ReportView;