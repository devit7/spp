import React from "react"
import axios from "axios"
import { base_url } from "../config"

//import template
import { Grid, TextField, Button } from "@material-ui/core"
import { minHeight } from "@material-ui/system";

class Login extends React.Component{
    //contructor
    constructor(){
        super()
        this.state = {
            username : "",
            password : "",
            message : "",
            logged : true
        }
    }

    //fungsi login
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }
        let url = base_url + "/petugas/auth"

        //post
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                localStorage.setItem("token", response.data.token)
                console.log(this.state.logged)
                localStorage.setItem("petugas", JSON.stringify(response.data.data))
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div>
                <Grid container style={{ minHeight: "100vh"}}>
                    <Grid item xs={12} sm={6}>
                        <img
                            src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
                            style={{width: "100%", height: "100%", objectFit:"cover"}}
                            alt="school"
                        />
                    </Grid>
                    <Grid container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{padding: 10}}>
                        <div /> 
                        <form onSubmit={ev => this.Login(ev)}>
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300}}>
                            <Grid container justify="center">
                                <img
                                    src="https://www.nicepng.com/png/full/772-7724307_logo-telkom-school-png-logo-smk-telkom-malang.png"
                                    width={200}
                                />
                            </Grid>
                            <TextField label="Username" margin="normal" type="text" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
                            <TextField label="Password" margin="normal" type="password" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} autoComplete="false"/>
                            <div style={{ height: 20 }}/>
                            <Button color="primary" variant="contained" type="submit">
                                Log in
                            </Button>
                            <div style={{ height: 20 }}/>
                            <Button>Sign Up for joining program?</Button>
                        </div>
                        </form>
                        <div/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

//export
export default Login