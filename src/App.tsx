import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Table, Form, Toast } from "react-bootstrap"; // npm install react-bootstrap bootstrap
// import "bootstrap/dist/css/bootstrap.css";
// import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  const [Users, fetchUsers] = useState<any>([]);
  const [searchKey, setSearchKey] = useState<any>("");
  const [TableView, setTableView] = useState<any>(false);
  const [show, setShow] = useState(false);
  const getData = async () => {
    fetch(`https://api.github.com/users/${searchKey}`)
      .then((res) => res.json())
      .then((res) => {
        fetchUsers(res);
      });
      console.log(Users)
  };
  useEffect(() => {

    if (Users.name) {
      setTableView(true);
    } else {
      setTableView(false);
      setShow(true);
    }
  }, [Users]);
  return (
    <div className="container">
      <h2>Github Fetch API Example</h2>
      <Form.Control
        type="text"
        placeholder="Enter Github User Name"
        onChange={(e:any) => setSearchKey(e.target.value)}
      />
      <Button onClick={getData}>Search</Button>
      {show && (
        <Row>
          <Col xs={6}>
            <Toast
              show={true}
              delay={1200}
              onClose={() => setShow(false)}
              autohide
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Error</strong>
                <small>From GitHub</small>
              </Toast.Header>
              <Toast.Body>Woohoo, User Nort Foud</Toast.Body>
            </Toast>
          </Col>
        </Row>
      )}

      {TableView && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>ID</th>
              <th>UserName</th>
              <th>Name</th>
              <th>Created Date/Time</th>
              <th>Public Repo</th>
              <th>Starred URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src={Users.avatar_url} height={100} width={100}/></td>
              <td>{Users.id}</td>
              <td>{Users.login}</td>
              <td>{Users.name}</td>
              <td>{Users.created_at}</td>
              <td>{Users.public_repos}</td>
              <td>{Users.starred_url}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default App;
