import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, Container, Message, Divider } from "semantic-ui-react";
import UserSession from "../modules/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const response = await UserSession.login(e, dispatch, history);
    if (response.success) {
      history.replace({ pathname: "/" });
    } else {
      setErrorMessage(response);
    }
  };

  return (
    <>
      <Container id="login-container">
        <h1 data-cy="login-message">
          Before you can create or join a poll, you just need to login
        </h1>
        <Divider />
      </Container>

      <Container className="login-container">
        {errorMessage && (
          <Message data-cy="error-message" color="red" id="message">
            {errorMessage}
          </Message>
        )}
        <Form data-cy="login-form" onSubmit={register} id="login-form">
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Email:"
            placeholder="email"
            name="email"
            type="email"
            data-cy="email"
          />

          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="password"
            label="Password:"
            type="password"
            name="password"
            data-cy="password"
          />
          <Button
            data-cy="submit"
            content="Login"
            id="button"
            basic
            color="red"
          />
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
