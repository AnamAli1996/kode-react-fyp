import React from "react";
import PropTypes from "prop-types";
import {Form, Button} from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
    state = {
        data: {
            firstName: "",
            lastName: "",
            Age: "",
            email: "",
            password: ""

        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            ...this.state,
            data: {...this.state.data, [e.target.name]: e.target.value}
        });


    onSubmit = () => {
        const errors = this.validate(this.state.data);
        console.log("State= ", this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err =>
                    this.setState({ errors: err.response.data.errors, loading: false })
                );
        }
    };

    validate = data => {
        const errors = {};
        if (!data.firstName) errors.firstName = "Cant be blank";
        if (!data.lastName) errors.lastName = "Cant be blank";
        if (!data.age) errors.age = "Cant be blank";
        if (!isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";

        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!!errors.firstName}>
                    <label style={{color: 'white'}} htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={data.firstName}
                        onChange={this.onChange}
                    />
                    {errors.firstName && <InlineError text={errors.firstName}/>}
                </Form.Field>
                    <Form.Field error={!!errors.lastName}>
                        <label style={{color: 'white'}} htmlFor="LastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="last name"
                            value={data.lastName}
                            onChange={this.onChange}
                        />
                        {errors.lastName && <InlineError text={errors.lastName}/>}
                    </Form.Field>
                        <Form.Field error={!!errors.age}>
                            <label style={{color: 'white'}} htmlFor="age">Age</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                placeholder="age"
                                value={data.age}
                                onChange={this.onChange}
                            />
                            {errors.email && <InlineError text={errors.email}/>}
                        </Form.Field>
                            <Form.Field error={!!errors.email}>
                                <label style={{color: 'white'}} htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="email@email.com"
                                    value={data.email}
                                    onChange={this.onChange}
                                />
                                {errors.email && <InlineError text={errors.email}/>}
                            </Form.Field>

                            <Form.Field error={!!errors.password}>
                                <label style={{color: 'white'}} htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={this.onChange}
                                />
                                {errors.password && <InlineError text={errors.password}/>}
                            </Form.Field>

                            <Button primary>Sign Up</Button>
            </Form>
    );
    }
    }

    SignupForm.propTypes = {
        submit: PropTypes.func.isRequired
    };

    export default SignupForm;