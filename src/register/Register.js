import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            idkey:"",
            firstname:"",
            lastname:"",
            email:localStorage.getItem('email'),
            games:"",
            sapdata:[]
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }

    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,
            games:this.state.games
        }
        axios.post(url,data)
        this.setState({
            idkey:"",
            firstname:"",
            lastname:"",
            email:"",
            games:""
        });
    }

    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/favgametype')
            .then(res => res.json())
            .then(list => this.setState({ sapdata:list }))
        console.log("after fetch data");
    }

    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">Register<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                    <div className="form-group">
                        <label className="text-white" >First Name</label>
                        <input type="text" className="form-control" id="firstname" onChange={this.handleChang} value={this.state.firstname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Last Name</label>
                        <input type="text" className="form-control" id="lastname" onChange={this.handleChang} value={this.state.lastname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Email</label>
                        <input type="text" className="form-control" id="email" onChange={this.handleChang} value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Favourite Games Type</label>
                        <br></br>
                        <select className="form-control" id="games" onChange={this.handleChang} value={this.state.games} required>
                            <option>Select Games type</option>
                            {this.state.sapdata.map(user => {
                                return <option value={user.ID_Game}>{user.Type}</option>
                            })}
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                </form>
            </div>
        );
    }
}
