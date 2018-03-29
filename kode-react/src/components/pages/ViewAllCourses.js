import React from 'react';
import axios from 'axios'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

let courseId;
function priceFormatter(cell, row) {
    return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
}

    export default class ViewAllCourses extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                courseList: [],
                search: ""
            };

        }

        componentDidMount(){
            axios.get("http://localhost:8080/api/course/allCourse")
                .then(res => {
                        const courseList = res.data;
                        console.log(courseList);
                        this.setState({courseList: courseList});
                    }
                )
        }

        onClickCourseSelected(cell, row, rowIndex){
            console.log('Course', row.id);
            axios.get("http://localhost:8080/api/Student/enrollCourse/" + row.id);


        }

        onViewCourseSelected(cell, row, rowIndex){
            console.log('Course', row.id);
            window.open("/courses/" + row.id);


        }

        enrollButton(cell, row, enumObject, rowIndex) {
            return (
                <button type="button"
                        onClick={() =>
                            this.onClickCourseSelected(cell, row, rowIndex)}>
                    Enroll
                </button>
            )
        }

        ViewButton(cell, row, enumObject, rowIndex) {
            return (
                <button type="button"
                        onClick={() =>
                            this.onViewCourseSelected(cell, row, rowIndex)}>
                   View
                </button>
            )
        }


        render(){
            console.log(this.state.courseList);
            return(
                <BootstrapTable data={this.state.courseList}>
                    <TableHeaderColumn dataField='id' isKey dataSort={ true } dataAlign='center'>Course</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={ true } dataAlign='center'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='description' dataAlign='center'>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='price' dataSort={ true } dataFormat={ priceFormatter } dataAlign='center'>Price</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.enrollButton.bind(this)}>Enroll</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.ViewButton.bind(this)}>View</TableHeaderColumn>
                </BootstrapTable>
            )
        }



}
