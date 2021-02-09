import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {

    const cerrarsesion = () =>{
        auth.signOut().then(()=>{
            props.history.push('/login')
        })

    }
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Auth</Link>
            <div>
                <div className="d-flex">
                    <NavLink className="btn btn-dark mr-2 " to="/" exact>
                        Inicio
                    </NavLink>
                    {
                        props.firebaseuser !== null ? (
                            <NavLink className="btn btn-dark mr-2" to="/admin">
                                Admin
                             </NavLink>

                        ) : (
                            null
                        )

                    }
                    
                    {
                        props.firebaseuser !== null ? (
                            <buton className="btn btn-dark" 
                            onClick = {() => cerrarsesion()}>
                                cerrar sesion</buton>
                        ) : (
                            <NavLink className="btn btn-dark mr-2" to="/login">
                        login
                    </NavLink>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default withRouter (Navbar)
