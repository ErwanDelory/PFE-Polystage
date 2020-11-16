/*import React from "react";

function Home() {
    return (
        <div>
           <p>Home page</p>
        </div>
    );
}
export default Home;*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resData: '',
            token: sessionStorage.getItem('token')
        };
    }


    componentDidMount() {
        fetch('http://localhost:5000/api/test', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
    }

    render() {
        return (
            <div>
                <p>Home page</p>
                <Link to="/error">
                    <p>Go vers error</p>
                </Link>
            </div>
        );
    }
}