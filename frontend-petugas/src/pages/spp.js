import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"
import $ from "jquery"

export default class Spp extends React.Component{
    constructor(){
        super()
        this.state = {
            spp:[],
            token:"",
            action:"",
            id_spp:"",
            tahun:"",
            nominal:""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({spp: response.data.data})
            console.log(response.data.data)
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getSpp()
    }
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            id_spp: 0,
            tahun: "",
            nominal:""
        })
    }
    Edit = selectedItem => {
        //console.log(selectedItem)
        $("#modal_product").modal("show")
        this.setState({
            action: "update",
            id_spp: selectedItem.id_spp,
            tahun: selectedItem.tahun,
            nominal: selectedItem.nominal
        })
        //console.log(this.state.id_kelas)
    }
    saveSpp = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
        let data = {
            "id_spp": this.state.id_spp,
            "tahun": this.state.tahun,
            "nominal": this.state.nominal}

        let url = base_url + "/spp"
        if (this.state.action === "insert") {
            axios.post(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        }
    }
    dropSpp = selectedItem => {
        if (window.confirm("are you sure will delete this data?")) {
            let url = base_url + "/spp/" + selectedItem.id_spp
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div>
               <Navbar />
               <div className="container">
                    <h3 className="text-bold text-info mt-2">SPP</h3>
                    <table className="table table-bordered">
                        <thead className="bg-info">
                            <tr>
                                <th>ID SPP</th>
                                <th>TAHUN</th>
                                <th>NOMINAL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.spp.map(item => 
                                <tr>
                                    <td>{item.id_spp}</td>
                                    <td>{item.tahun}</td>
                                    <td>{item.nominal}</td>
                                    <td>
                                    <button className="btn btn-sm btn-warning m-1" onClick={() => this.Edit(item)} >
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger m-1" onClick={() => this.dropSpp(item)}>
                                        Hapus
                                    </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah SPP
                    </button>

                    {/** modal spp */}
                    <div className="modal fade" id="modal_product">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form SPP</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveSpp(ev)}>
                                        ID SPP
                                        {this.state.action === 'update' ? (
                                            <input type="number" className="form-control mb-1"
                                                value={this.state.id_spp}
                                                onChange={ev => this.setState({ id_spp: ev.target.value})}
                                                disabled
                                            />
                                        ):(null)}
                                        {this.state.action === "insert" ? (
                                            <input type="number" className="form-control mb-1"
                                            value={this.state.id_spp}
                                            onChange={ev => this.setState({ id_spp: ev.target.value})}
                                            required
                                        />
                                        ):(null)}
                                        TAHUN
                                        <input type="number" className="form-control mb-1"
                                            value={this.state.tahun}
                                            onChange={ev => this.setState({ tahun: ev.target.value})}
                                            required
                                        />
                                        NOMINAL
                                        <input type="number" className="from-control mb-1"
                                            value={this.state.nominal}
                                            onChange={ev => this.setState({ nominal: ev.target.nominal})}
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