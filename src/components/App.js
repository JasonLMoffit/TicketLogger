import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Logitem from "./Logitem";
import AddLogItem from "./AddLogItem";
import { ipcRenderer } from "electron";
import Ticket from "./Ticket";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  const [currentTicket, setCurrentTicket] = useState({
    _id,
    title,
    text,
    user,
    description,
    created,
  });

  useEffect(() => {
    ipcRenderer.send("logs:load");
    // ipcRenderer.send("log:load", currentTicket);

    ipcRenderer.on("logs:get", (e, logs) => setLogs(JSON.parse(logs)));

    ipcRenderer.on("logs:clear", () => {
      setLogs([]);
      showAlert("Logs cleared");
    });
  }, []);

  function addItem(item) {
    if (
      item.text === "" ||
      item.user === "" ||
      item.description === "" ||
      item.priority === ""
    ) {
      showAlert("Please enter all fields", "danger");
      return;
    }
    // item._id = Math.floor(Math.random() * 90000) + 10000;
    // item.created = new Date().toString();
    // setLogs([...logs, item]);

    ipcRenderer.send("logs:add", item);

    showAlert("Log added");
  }

  function deleteItem(_id) {
    // setLogs(logs.filter((item) => item._id !== _id));
    ipcRenderer.send("logs:delete", _id);
    showAlert("Log removed");
  }

  function showAlert(message, variant = "success", seconds = 3000) {
    setAlert({
      show: true,
      message,
      variant,
    });
    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  }

  function goBack() {
    setCurrentTicket({});
  }

  return (
    <div className="app">
      <Container>
        <AddLogItem addItem={addItem} />
        {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
        <Table>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Log text</th>
              <th>User</th>
              <th>Description</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentTicket._id === undefined
              ? logs.map((log) => (
                  <Logitem
                    key={log._id}
                    log={log}
                    deleteItem={deleteItem}
                    currentTicket={currentTicket}
                    setCurrentTicket={setCurrentTicket}
                  />
                ))
              : Ticket(goBack, currentTicket)}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default App;
