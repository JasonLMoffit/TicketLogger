import React from "react";
import { Button } from "react-bootstrap";

const Ticket = ({
  goBack,
  currentTicket: { id, title, text, description, user, created },
  // logs: { _id, title, text, description, user },
}) => {
  console.log(title);
  return (
    <div>
      <Button
        variant="secondary"
        block
        style={{ margin: "1em 0 2em 0" }}
        onClick={() => goBack()}
      >
        Back
      </Button>
      {/* <ul>{currentTicket.title}</ul> */}
    </div>
  );
};

export default Ticket;
