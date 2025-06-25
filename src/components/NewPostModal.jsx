import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({ show, handleClose }) {
  const [postContent, setPostContent] = useState("");

  const handleSave = () => {
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const data = {
      title: "Post Title",
      content: postContent,
      user_id: userId,
    };

    axios
      .post(
        "https://e7000416-eb00-4f1e-a87e-46a44215795e-00-12uzm3id8zp2g.pike.replit.dev/posts",
        data
      )
      .then((response) => {
        console.log("Success", response.data);
        handleClose();
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent">
              <Form.Control
                placeholder="What is happening?"
                as="textarea"
                rows={3}
                onChange={(event) => setPostContent(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleSave}
          >
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
