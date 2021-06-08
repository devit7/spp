import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"
import $ from "jquery"

export default class Kelas extends React.Component{
    constructor(){
        super()
        this.state = {
            kelas: [],
            id_kelas: "",
            nama_kelas: "",
            kompetensi_keahlian: "",
            token: "",
            action: ""
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
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({kelas: response.data.data})
            console.log(response.data.data)
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error)
            }
        })
    }

    //componentdidmount
    componentDidMount(){
        this.getKelas()
    }

    //add
    Add = () => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "insert",
            id_kelas: 0,
            nama_kelas: "",
            kompetensi_keahlian: ""
        })
    }

    //edit
    Edit = selectionItem => {
        $("modal_kelas").modal("show")
        this.setState({
            action: "update",
            id_kelas: selectionItem.id_kelas,
            nama_kelas: selectionItem.nama_kelas,
            kompetensi_keahlian: selectionItem.kompetensi_keahlian
        })
    }

    //save kelas
    saveKelas = event => {
        event.preventDefault()
        $("#modal_kelas").modal("hide")
        let data = {
            "id_kelas" : this.state.id_kelas,
            "nama_kelas" : this.state.nama_kelas,
            "kompetensi_keahlian" : this.state.kompetensi_keahlian
        }

        let url = base_url + "/kelas"
        if (this.state.action === "insert") {
            axios.post(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update"){
            axios.put(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        }
    }

    //drop kelas
    dropKelas = selectionItem => {
        if (window.confirm("are you sure delete this data?")) {
            let url = base_url + "/kelas/" + selectionItem.id_kelas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        }
    }
    
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">KELAS</h3>
                    <table className="table table-bordered">
                        <thead className="bg-info">
                            <tr>
                                <th>ID KELAS</th>
                                <th>NAMA KELAS</th>
                                <th>KEAHLIAN</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.kelas.map(item => 
                                <tr>
                                    <td>{item.id_kelas}</td>
                                    <td>{item.nama_kelas}</td>
                                    <td>{item.kompetensi_keahlian}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning m-1" onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger m-1" onClick={() => this.dropKelas(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Kelas
                    </button>

                    {/** modal kelas */}
                    <div className="modal fade" id="modal_kelas">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form KELAS</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveKelas(ev)}>
                                    ID KELAS
                                    {this.state.action === 'update' ? (
                                        <input type="number" className="form-control mb-1"
                                            value={this.state.id_kelas}
                                            onChange={ev => this.setState({id_kelas: ev.target.value})}
                                            disabled
                                        />
                                    ):(null)}
                                    {this.state.action === 'insert' ? (
                                        <input type="number" className="form-control mb-1" 
                                        value={this.state.id_kelas}
                                        onChange = {ev => this.setState({id_kelas: ev.target.value})}
                                        required
                                        />
                                    ):(null)}
                                    NAMA KELAS
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama_kelas}
                                        onChange={ev => this.setState({nama_kelas: ev.target.value})}
                                        required
                                    />
                                    KOMPETENSI KEAHLIAN
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.kompetensi_keahlian}
                                        onChange={ev => this.setState({kompetensi_keahlian: ev.target.value})}
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

