import React from 'react'
import {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const [email, setemail]= React.useState('')
    const [pass, setpass]= React.useState('')
    const [error, seterror]=React.useState(false)
    const [esRegistro, setEsRegistro] = React.useState(true)

    const procesarDatos = e => {
        e.preventDefault()

        if(!email.trim()){
            //console.log('ingrese email')
            seterror('Ingrese email')
            return
        }
        if(!pass.trim()){
            //console.log('ingrese pass')
            seterror('Ingrese password')
            return
        }
        if(pass.length < 6){
            //console.log('password mayora 6 caracteres')
            seterror('password de 6 caracteres o mas')
        }

        seterror(null)
        console.log('pasando todas las validaciones')

        if(esRegistro){
            registrar()
        }else{
            ingresar()
        }

    }

    const ingresar =React.useCallback(async () => {

        try{

           const res =  await auth.signInWithEmailAndPassword(email, pass)
           console.log(res.user)
           setemail('')
            setpass('')
            seterror(null)
            props.history.push('/admin')

        }catch(error){
            if(error.code === 'auth/invalid-email'){
                seterror('Email no valido')
            }
            if(error.code === 'auth/user-not-found'){
                seterror('Email no registrado')
            }
            if(error.code === 'auth/wrong-password'){
                seterror('Contraseña incorrecta')
            }

        }
    },[email, pass, props.history])

    const registrar = React.useCallback( async() => {
        try{
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            await db.collection(res.user.uid).add({
                name: 'tarea de ejemplo',
                fecha: Date.now()
            })
            setemail('')
            setpass('')
            seterror(null) 
            props.history.push('/admin')

        }catch(error){
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                seterror('email no valido')
            }
            if(error.code === 'auth/email-already-in-use'){
                seterror('email ya registrado')
            }

        }

    }, [email, pass, props.history] )


    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese un email"
                            onChange={e => setemail(e.target.value)}
                            value= {email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese un contraseña"
                            onChange={e => setpass(e.target.value)}
                            value= {pass}
                        />
                        <button className="btn btn-lg btn-dark btn-block" type="submit">
                            {
                                esRegistro ? 'Registrate' : 'Acceder'
                            }
                        </button>
                        <br/>
                        <br/>
                        <button
                         className="btn btn-sm btn-info btn-block"
                         onClick= {() => setEsRegistro(!esRegistro)}
                         type="button"
                        
                        >
                            {
                                esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
                            }
                        </button>
                        <br/>
                        <br/>
                        {
                            !esRegistro ? (
                                <button 
                                    className="btn btn-lg btn-danger btn-block btn-sm mt-2" 
                                    type="button"
                                    onClick={() => props.history.push('/reset')}
                                >
                                    recuperar contraseña
                                </button>
                            ) : null
                        }
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter (Login)
