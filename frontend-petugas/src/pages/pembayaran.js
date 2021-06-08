import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"
import $ from "jquery"

export default class Pembayaran extends React.Component{
    constructor(){
        super()
        this.state = {
            pembayaran: [],
            id_pembayaran: "",
            id_petugas: "",
            nisn: "",
            tgl_bayar: "",
            id_spp: "",
            jumlah_bayar: ""
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

    //get pembayaran
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({pembayaran: response.data.data})
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
        this.getPembayaran()
    }

    //add
    Add = () => {
        $("modal_pembayaran").modal("show")
        this.setState({
            action: "insert",
            id_pembayaran: 0,
            id_petugas: "",
            nisn: "",
            tgl_bayar: "",
            id_spp: "",
            jumlah_bayar: ""
        })
    }

    //edit
    Edit = selectedItem => {
        $("#modal_pembayaran").modal("show")
        this.setState({
            action: "update",
            id_pembayaran: selectedItem.id_pembayaran,
            id_petugas: selectedItem.id_petugas,
            nisn: selectedItem.nisn,
            tgl_bayar: selectedItem.tgl_bayar,
            id_spp: selectedItem.id_spp,
            jumlah_bayar: selectedItem.jumlah_bayar
        })
    }

    //save
    savePembayaran = event  => {
        event.preventDefault()
        $("#modal_pembayaran").modal("hide")
        let data = {
            "id_pembayaran": this.state.id_pembayaran,
            "id_petugas": this.state.id_petugas,
            "nisn": this.state.nisn,
            "tgl_bayar": this.state.tgl_bayar,
            "id_spp": this.state.id_spp,
            "jumlah_bayar": this.state.jumlah_bayar
        }
        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
            axios.post(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
        }
    }

    //delete
    dropPembayaran = selectedItem => {
        if (window.confirm("are you sure will delete this data?")) {
            let url = base_url + "/pembayaran/" + selectedItem.id_pembayaran
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">PEMBAYARAN</h3>
                    <table className="table table-bordered">
                        <thead className="bg-info">
                            <tr>
                                <th>ID PEMBAYARAN</th>
                                <th>ID PETUGAS</th>
                                <th>NISN</th>
                                <th>TGL BAYAR</th>
                                <th>ID SPP</th>
                                <th>JUMLAH BAYAR</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.pembayaran.map(item =>
                                <tr>
                                    <td>{item.id_pembayaran}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.nisn}</td>
                                    <td>{item.tgl_bayar}</td>
                                    <td>{item.id_spp}</td>
                                    <td>{item.jumlah_bayar}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning m-1" onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger m-1" onClick={() => this.dropPembayaran(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Pembayaran
                    </button>

                    {/** modal pembayaran */}
                    <div className="modal fade" id="modal_pembayaran">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Pembayaran</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.savePembayaran(ev)}>
                                        ID PEMBAYARAN
                                        {this.state.action === 'update' ? (
                                            <input type="number" className="form-control mb-1" value={this.state.id_pembayaran} onChange={ev => this.setState({id_pembayaran: ev.target.value})} disabled
                                            />
                                        ):(null)}
                                        {this.state.action === 'insert' ? (
                                            <input className="form-control mb-1" value={this.state.id_pembayaran} onChange={ev => this.setState({id_pembayaran: ev.target.value})} required
                                            />
                                        ):(null)}
                                        ID PETUGAS
                                        <input type="number" className="form-control mb-1" value={this.state.id_petugas} onChange = {ev => this.setState({ id_petugas: ev.target.value})} required
                                        />
                                        NISN
                                        <input type="text" className="form-control mb-1" value={this.state.nisn} onChange={ev => this.setState({ nisn: ev.target.value})}
                                        required
                                        />
                                        TGL BAYAR
                                        <input type="date" className="form-control mb-1" value={this.state.tgl_bayar} onChange={ev=> this.setState({tgl_bayar: ev.target.value})} required
                                        />
                                        ID SPP
                                        <input type="number" className="form-control mb-1" value={this.state.id_spp} onChange={ev => this.setState({id_spp: ev.target.value})}
                                        required
                                        />
                                        JUMLAH BAYAR
                                        <input type="number" className="form-control mb-1" value={this.state.jumlah_bayar} onChange = {ev => this.setState({ jumlah_bayar: ev.target.value})}
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