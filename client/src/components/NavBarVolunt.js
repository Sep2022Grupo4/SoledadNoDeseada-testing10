import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faPeopleGroup, faListCheck, faPalette, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";

function NavBarVolunt(props) {
    const user = props.user
    const navigate = useNavigate()
    return (
    <div>
        <div className="bottom-margin"></div>
    
    <div className="NavBar">

            <div className="btn-NavBar" onClick={(e)=>{navigate("/")}}>
                <FontAwesomeIcon icon={faHouseUser} />
                <p className="sub-btn-NavBar">Home</p>
                <div className="over-btn" id="over-btn-home"></div>
            </div>
            <div className="btn-NavBar" onClick={(e)=>{navigate(`/usuariosAsignados`)}}>
                <FontAwesomeIcon icon={faPeopleGroup} />
                <p className="sub-btn-NavBar">Usuarios/as</p>
                <div className="over-btn" id="over-btn-usuarios"></div>
            </div>
            <div className="btn-NavBar" onClick={(e)=>{navigate("/talleres")}}>
                <FontAwesomeIcon icon={faPalette} />
                <p className="sub-btn-NavBar">Talleres</p>
                <div className="over-btn" id="over-btn-talleres"></div>
            </div>

    </div></div>)
}


export default NavBarVolunt;