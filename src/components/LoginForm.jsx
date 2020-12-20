import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, Container, Message } from "semantic-ui-react";
import { login } from "../modules/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState();

  const register = async (e) => {
    e.preventDefault();
    const response = await login(e, dispatch, history);
    setMessage(response);
  };

  return (
    <>
    <Message>Before you can create a new poll, you just need to login</Message>
      <Container>
        <Form data-cy="login-form" onSubmit={register}>
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
          <Button data-cy="submit" content="Submit" primary />
        </Form>
        {message && (
          <Message data-cy="message" color="red">
            {message}
          </Message>
        )}
      </Container>
    </>
  );
};

export default LoginForm;
