import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"
import $ from "jquery"

export default class Petugas extends React.Component{
    constructor(){
        super()
        this.state = {
            petugas: [],
            id_petugas: "",
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillPassword: true
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    //headerconfig
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    
    //get kelas
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({petugas: response.data.data})
            console.log(response.data.data)
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.pushS("/login")
                }
            } else {
                console.log(error)
            }
        })
    }

    //componentdidmount
    componentDidMount(){
        this.getPetugas()
    }

    //add
    Add = () => {
        $("modal_petugas").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillPassword: true
        })
    }

    //edit
    Edit = selectionItem => {
        $("modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectionItem.id_petugas,
            username: selectionItem.username,
            password: selectionItem.password,
            nama_petugas: selectionItem.nama_petugas,
            level: selectionItem.level,
            fillPassword: false
        })
    }

    //save
    savePetugas = (ev) => {
        $("modal_petugas").modal("hide")
        let form = {
            id_petugas: this.state.id_petugas,
            username: this.state.username,
            password: this.state.password,
            nama_petugas: this.state.nama_petugas,
            level: this.state.level
        }
        if (this.state.password) {
            form.password = this.state.password
        }
        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update"){
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }

    //drop
    dropPetugas = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/petugas/" + selectionItem.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }


    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Petugas</h3>
                    <table className="table table-bordered">
                        <thead className="bg-info">
                            <tr>
                                <th>ID PETUGAS</th>
                                <th>USERNAME</th>
                                <th>PASSWORD</th>
                                <th>NAMA PETUGAS</th>
                                <th>LEVEL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.petugas.map(item => 
                                <tr>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.username}</td>
                                    <td>{item.password}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.level}</td>
                                    <td>
                                    <button className="btn btn-sm btn-warning m-1" onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger m-1" onClick={() => this.dropPetugas(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>    
                            )}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Petugas
                    </button>

                    {/** modal petugas */}
                    <div className="modal fade" id="modal_petugas">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Petugas</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.savePetugas(ev)}>
                                        ID PETUGAS
                                        {this.state.action === 'update' ? (
                                            <input type="number" className="form-control mb-1"
                                            value = {this.state.id_petugas}
                                            onChange={ev => this.setState({id_petugas: ev.target.value})}
                                            disabled
                                            />
                                        ):(null)}
                                        {this.state.action === 'insert' ? (
                                            <input type="number" className="form-control mb-1"
                                            value = {this.state.id_petugas}
                                            onChange={ev => this.setState({id_petugas: ev.target.value})}
                                            required
                                            />
                                        ):(null)}
                                        USERNAME
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                        />
                                        PASSWORD
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.password}
                                        onChange={ev => this.setState({password: ev.target.value})}
                                        required
                                        />
                                        NAMA PETUGAS
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama_petugas}
                                        onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                        required
                                        />
                                        LEVEL
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.level}
                                        onChange={ev => this.setState({level: ev.target.value})}
                                        required
                                        />
                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
