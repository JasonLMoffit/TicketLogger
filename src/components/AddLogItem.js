import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
// import  from "react-bootstrap/Form"
// import  from "react-bootstrap/Row"
// import  from "react-bootstrap/Col"
// import  from "react-bootstrap/Button"

const AddLogItem = ({ addItem }) => {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addItem({ text, user, description, priority });
    setDescription("");
    setText("");
    setUser("");
    setPriority("");
  };

  return (
    <Card className="mt-5 mb-3">
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className="my-3">
            <Col>
              <Form.Control
                placeholder="Title"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Control
                placeholder="Breif description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                placeholder="User"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="0">Select Priority</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Button type="submit" variant="secondary" block>
                Add Log
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddLogItem;
