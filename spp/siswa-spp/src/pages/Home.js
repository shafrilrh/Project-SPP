import React from "react"
import Navbar from "../components/Navbar"
import BayarList from "../components/BayarList"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class Pembayaran extends React.Component{
    constructor(){
        super()
        let date = new Date()
        this.state = {
            pembayaran: [],
            token: "",
            action: "",
            id_siswa: null,
            siswaName: null,
            id_pembayaran: "",
            id_petugas: "",
            nisn: "",
            tgl_bayar: date,
            bulan_dibayar: "",
            jumlah_bayar: "",
            id_spp: ""
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        }
        else if (localStorage.getItem("siswa")) {
            this.state.nisn = localStorage.getItem("nisn")
        }  else {
            window.location = "/login"
        }
        
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getSiswa = () => {
        let siswa = JSON.parse(localStorage.getItem('siswa'))
        this.setState({siswaName: siswa.nama})
    }

    
    // getNisn = () => {
    //     let siswa = JSON.parse(localStorage.getItem('siswa'))
    //     this.setState({nisn: siswa.nisn})
    // }

    getBayar = () => {
        let siswa = JSON.parse(localStorage.getItem('siswa'))
        this.setState({nisn: siswa.nisn})
        let url = base_url + "/pembayaran/" + siswa.nisn
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({pembayaran: response.data.data})
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
        this.getBayar()
        this.getSiswa()
        // this.getNisn()
    }   

    


    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                <h3 className="my-2">
                        <strong>Selamat Datang, {this.state.siswaName}</strong>
                    </h3>

                       <h3 className="text-bold text-dark mt-2">Data Pembayaran SPP anda : </h3>
                   { this.state.pembayaran.map(item => (
                        <BayarList
                        key =  {item.id_pembayaran}
                        id_pembayaran = {item.id_pembayaran}
                        id_petugas = {item.id_petugas}
                        nisn= {item.nisn}
                        tgl_bayar = {item.tgl_bayar}
                        bulan_dibayar = {item.bulan_dibayar}
                        tahun_dibayar = {item.tahun_dibayar}
                        id_spp = {item.id_spp}
                        jumlah_bayar = {item.jumlah_bayar}
                         />
                    )) }
                    <br></br>
                   <br></br>
                   <br></br>
                </div>
            </div>
        )
    }
}