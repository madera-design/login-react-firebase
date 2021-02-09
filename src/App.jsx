import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Admin from './componentes/Admin';
import Login from './componentes/Login';
import Navbar from './componentes/Navbar';
import Recuperar from './componentes/Recuperar';

import {auth} from './firebase'

function App() {

  const [firebaseuser, setfirebaseuser] = React.useState(false)
  React.useEffect(()=>{
    auth.onAuthStateChanged(user => {
      if(user){
        setfirebaseuser(user)
      }else{
        setfirebaseuser(null)
      }

    })
  }, [])
  return firebaseuser !== false ? (
    <Router>
        <div className="container">
          <Navbar firebaseuser = {firebaseuser}/>
            <Switch>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/admin">
                <Admin/>
              </Route>
              <Route path="/reset">
                <Recuperar/>
              </Route>
              <Route path="/">
                inicio..
              </Route>
            </Switch>
         </div>
    </Router>  
  ) : (<p>cargando...</p>)
}

export default App;
