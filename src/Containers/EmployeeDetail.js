import React, { Component } from "react";
import axios from "axios";
import { Card } from "antd";
class EmployeeDetail extends Component {
    state = {
        employee: {},
    };

    componentDidMount() {
        const employeeId = this.props.match.params.employeeId;
        axios.get(`http://127.0.0.1:8000/${employeeId}`).then((res) => {
            this.setState({ employee: res.data });
        });
    }

    render() {
        return (
            <Card title={this.state.employee.first_name}>
                <p>{this.state.employee.address}</p>
            </Card>
        );
    }
}

export default EmployeeDetail;
