import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

function EventReportOverlay(props) {
    const [view, setView] = useState("report")
    const {user} = useContext(UserContext)
    const [description_, setDescription] = useState("")

    const handleShow = ()=>{
        props.setShow(false)
    }
    const handleSubmit = async () =>{
        const response = await fetch("/newReport",{
            method:"POST",
            mode:"cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fk_id_event: props.id, fk_id_volunteer: user.id , description_})
        })
        const validation = response.json()
        if(validation){
            setView("alert")
        }
    }
    useEffect(()=>{
        const button = document.getElementById("btn-enviar")
        if(description_.length==0){
            button.disabled = true
        } else { button.disabled=false}
    },[description_])


    return (<div className="ReportOverlay">
        {view === "report" && <div className="report">
            <h3>Reportar evento</h3>
            <button className="close report-close" onClick={handleShow}>X</button>
            <textarea className="report-textarea" placeholder="Escribe tu comentario aquí" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            <button className="centrado" onClick={handleSubmit} id="btn-enviar">Enviar</button>
        </div>}
        {view==="alert"&& <div className="report-alert report">
            <h3>Tu mensaje ha sido enviado</h3>
            <button className="centrado" onClick={handleShow}>Aceptar</button>
            </div>}
    </div>)
}


export default EventReportOverlay;