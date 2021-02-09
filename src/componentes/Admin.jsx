import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'
import Firestore from './Firestore'


const Admin = (props) => {

    const [user, setuser] = React.useState(null)


React.useEffect(()=>{
    if(auth.currentUser){
        console.log('si existe')
        setuser(auth.currentUser)

    }else{
        console.log('no existe')
        props.history.push('/login')
    }

},[props.history])

    return (
        <div>
            <h2>ruta protegida</h2>
            {
                user && (
                    <Firestore user= {user}/>
                )
            }
        </div>
    )
}

export default withRouter (Admin)
