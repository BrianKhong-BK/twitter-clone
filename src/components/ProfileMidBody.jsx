import { Button, Col, Image, Nav, Row } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function ProfileMidBody() {
  const [posts, setPosts] = useState([]);
  const url = "src/images/cover.jpg";
  const pic = "src/images/profile.jpg";

  const fetchPosts = (userId) => {
    fetch(
      `https://42749a8f-e10c-423c-9cdb-e653463b4d34-00-2pp8ywtam1456.pike.replit.dev/posts/user/${userId}`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetchPosts(userId);
    }
  }, []);

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>

      <p
        className="mt-5"
        style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
      >
        Brian
      </p>

      <p style={{ marginBottom: "2px" }}>@brian.khong</p>

      <p>I'm trying to land a job as a software developer</p>

      <p>Try hard</p>

      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>

      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">Likes</Nav.Link>
        </Nav.Item>
      </Nav>
      {posts.length > 0 ? (
        posts.map((post) => (
          <ProfilePostCard key={post.id} content={post.content} id={post.id} />
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </Col>
  );
}
