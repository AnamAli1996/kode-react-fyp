import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import * as actions  from "../../actions/auth";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import CourseList from "../search/CourseList";

const DashboardPage = ({isAuthenticated, logout} ) => (

    <div>
        <div>
            <Jumbotron>
                <h1>My Dashboard</h1>
                <p>{isAuthenticated ? (
                    <Button bsStyle="danger" onClick={() => logout()}>Logout</Button>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/login">Login</Link>

                    </div>
                )}</p>
            </Jumbotron>
            <CourseList/>

            <div>
                <Link to = "/AllCourses"> View All Courses </Link>
            </div>
        </div>

    </div>





);

DashboardPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.webToken
    };
}



export default connect(mapStateToProps, { logout: actions.logout })(DashboardPage);