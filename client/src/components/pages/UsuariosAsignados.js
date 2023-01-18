import { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar";
import HeadTitle from "../HeadTitle";
import UserContext from "../../context/UserContext";
import { useCookies } from "react-cookie";
import Login from '../Login'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function UsuariosAsignados() {
    const [cookies] = useCookies(['session']);
    const { user } = useContext(UserContext)
    const [logged, setLogged] = useState(false)
    const [usersData, setUsersData] = useState("")
    const navigate = useNavigate()
    const [usersFinded, setUsersFinded] = useState(false)
    const [input, setInput] = useState("")
    const [view, setView] = useState("all")

    useEffect(() => {
        async function searchUsers() {
            var res = await fetch(`/getUsersByName/${input}`)
            var usrFnd = await res.json();
            console.log(usrFnd)
            setUsersFinded(usrFnd)
        }
        if (input.length === 0) {
            setView("all")
        } else {
            searchUsers()
            setView("search")
        }
    }, [input])

    useEffect(() => {
        if (cookies.session && user.name !== "JsonWebTokenError") {
            setLogged(true)
        }
        console.log("session")
    }, [])


    useEffect(() => {
        async function getUserAsigned() {
            const res = await fetch(`/getUsers`)
            const usersFinded = await res.json()
            setUsersData(usersFinded)
            console.log(usersFinded)
        }
        getUserAsigned();
    }, [])

    const getAge = (birth_date) => {
        let hoy = new Date()
        let fechaNacimiento = new Date(birth_date)
        return hoy.getFullYear() - fechaNacimiento.getFullYear()
    }

    if (logged) {
        return (<div className="Home">
            {<HeadTitle title={"Usuaria/os asignada/os"} />}
            <div className="form-group">
                <input className="buscador" type="text" onChange={(e) => setInput(e.target.value)} placeholder="Buscador" />
                <FontAwesomeIcon icon={faSearch} className="lupa-input" />
            </div>
            {view === "all" &&
                <div className="grid">
                    {(usersData && view === "all") && usersData.map((element, i) => {
                        return (
                            <div className="user-card" onClick={() => navigate(`/detalleUsuario/${element.id}`)} key={i}>
                                {(element.strikes > 0) ? <p className="badge">{element.strikes}</p> : null}
                                <img className="imgGrid" src={`/Images/${element.avatar}`} alt="Avatar" />
                                <p className="card-user-title">{element.first_name.split(" ")[0]}, {getAge(element.birth_date)}</p>
                                <p className="card-user-subtitle">{element.location}</p>
                                <p className="card-user-subtitle">Ult. contacto: {new Date(element.last_contact).toLocaleDateString('es-ES')}</p>
                            </div>
                        )
                    })
                    }
                </div>}

            {view === "search" &&
                <div className="grid">
                    {(usersFinded && view === "search") && usersFinded.map((element, i) => {
                        return (
                            <div className="user-card" onClick={() => navigate(`/detalleUsuario/${element.id}`)} key={i}>
                                {(element.strikes > 0) ? <p className="badge">{element.strikes}</p> : null}
                                <img className="imgGrid" src={`/Images/${element.avatar}`} alt="Avatar" />
                                <p className="card-user-title">{element.first_name.split(" ")[0]}, {getAge(element.birth_date)}</p>
                                <p className="card-user-subtitle">{element.location}</p>
                                <p className="card-user-subtitle">Ult. contacto: {new Date(element.last_contact).toLocaleDateString('es-ES')}</p>
                            </div>
                        )
                    })
                    }
                </div>
            }
            <NavBar />
        </div>)
    } else {
        return <Login setLogged={setLogged} />
    }


}


export default UsuariosAsignados;