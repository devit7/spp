import React from "react"
import { Switch, Route } from "react-router-dom"

//imprort pages
import Home from "./pages/home"
import Login from "./pages/login"
import Pembayaran from "./pages/pembayaran"
import Siswa from "./pages/siswa"
import Spp from "./pages/spp"
import Kelas from "./pages/kelas"
import Petugas from "./pages/petugas"

class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/pembayaran" component={Pembayaran}/>
        <Route path="/siswa" component={Siswa}/>
        <Route path="/spp" component={Spp}/>
        <Route path="/Kelas" component={Kelas}/>
        <Route path="/Petugas" component={Petugas}/>
      </Switch>
    )
  }
}

export default App;
