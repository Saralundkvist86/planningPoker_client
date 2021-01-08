import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import Polls from "../modules/polls";

const ClosePoll = ({ setState, setResult, state }) => {
  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState();
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const assignPointsHandler = async () => {
    let result = selectedPoints;
    const response = await Polls.assign(id, result);
    if (response.message) {
      setState(response.state);
      setMessage(response.message);
      setResult(response.result);
    } else {
      setMessage(response);
    }
  };

  const handlePointsChange = (value) => {
    setSelectedPoints(value);
  };
  const options = [
    { key: "0", text: "0", value: 0 },
    { key: "1", text: "1", value: 1 },
    { key: "2", text: "2", value: 2 },
    { key: "3", text: "3", value: 3 },
  ];

  return (
    <>
      {message && (
        <>
          <Message data-cy="assign-message" color="black">
            {message}
          </Message>
        </>
      )}

      {!toggleSelect && state !== "closed" && (
        <Button
          onClick={() => setToggleSelect(true)}
          id="button"
          basic
          color="red"
          data-cy="assign"
        >
          Assing points
        </Button>
      )}
      {toggleSelect && state !== "closed" && (
        <>
          <Form.Select
            id="vote-select"
            options={options}
            onChange={(e, value) => {
              handlePointsChange(value.value);
            }}
            data-cy="value-select"
          />
          <Button
            basic
            data-cy="submit"
            id="vote-button"
            color="red"
            onClick={() => assignPointsHandler()}
          >
            Assign
          </Button>
        </>
      )}
    </>
  );
};

export default ClosePoll;
