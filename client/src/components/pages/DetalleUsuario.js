import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import ReportOverlay from "../ReportOverlay";
import UserContext from "../../context/UserContext";
import ResumeCall from "../ResumeCall"

function DetalleUsuario() {
    const [show, setShow] = useState(false)
    const [showResume, setShowResume] = useState(false)
    const [userData, setUserData] = useState("")
    const { id } = useParams()
    const [interests, setInterests] = useState("")
    const {user} = useContext(UserContext)
    const [call_id, setCall_id]=useState("")


    useEffect(() => {
        async function getUserData() {
            console.log(userData)
            if (!userData) {
                const res = await fetch(`/getUser/${id}`)
                const userDataf = await res.json()
                console.log(userDataf)
                setUserData(userDataf)
            }
        }
        getUserData();
    })

    useEffect(() => {
        async function formarInterests() {
            if (userData) {
                console.log(userData.interests)
                const interests_ = await JSON.parse(userData.interests)
                const filteredKeys = Object.keys(interests_).filter(key => interests_[key] === true);
                setInterests(filteredKeys.join(', '));
            }
        }
        formarInterests()
    },[userData])




    const getAge = (birth_date) => {
        let hoy = new Date()
        let fechaNacimiento = new Date(birth_date)
        return hoy.getFullYear() - fechaNacimiento.getFullYear()
    }

    const handleShow = () => {
        setShow(true)
    }
    const handleShowResume = async() => {
        console.log("start llamada")
        setShowResume(true)
        const res = await fetch("/startCall",{
            method:"POST",
            mode:"cors",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                fk_id_from:user.id,
                fk_id_to:id,
                time_start: new Date()
            })
        })
        const callData = await res.json()
        console.log("calldata",callData.id)
        setCall_id(callData.id)
    }
    const handleVisit = async()=>{
        await fetch(`/resetStrikes/${id}`)
    }

    return (<div className="Home">
        {show && <ReportOverlay setShow={setShow} id={id} />}
        {showResume&&<ResumeCall id_user={id} call_id={call_id} setShowResume={setShowResume} />}
        {userData && <div>
            <img className="img-usuario-detalle" src={`/Images/${userData.avatar}`} alt="Avatar" />
            <div className="banner-user">
                <p className="banner-user-name">{userData.first_name}, {getAge(userData.birth_date)}</p>
                <p className="banner-user-lastname">{userData.last_name}</p>
            </div>
            <div className="user-functions">
                <button className="centrado" onClick={handleShow}>REPORTAR</button>
                <button className="centrado" onClick={handleVisit}>VISITA</button>
                <a href={`tel:${userData.phone_number}`}onClick={handleShowResume}><button className="centrado" >LLAMAR</button></a>
            </div>
            <div className="detail-group">
                <label>Dirección</label>
                <p>{userData.location}</p> 
            </div>
            {userData && <div className="btn-map">
                <a style={{ color: "#E20613" }} href={`https://www.google.es/maps/place/${userData.location.replace(" ", "+")}/`}>
                    <FontAwesomeIcon icon={faLocationArrow} />
                </a>
            </div>}
            <div className="detail-group">
                <label>Teléfono</label>
                <p>{userData.phone_number}</p>
            </div>
            <div className="detail-group">
                <label>Intereses</label>
                <p>{interests + "."}</p>
            </div>
            <div className="detail-group">
                <label>Enfermedades o dolencias</label>
                <p>{userData.health_issues}</p>
            </div>
            <div className="detail-group">
                <label>Necesita coche</label>
                <p>{userData.car ? "si" : "no"}</p>
            </div>
            <div className="detail-group">
                <label>Comentarios</label>
                <p>{userData.comments}</p>
            </div>
        </div>}
        <NavBar />
    </div>)
}


export default DetalleUsuario;