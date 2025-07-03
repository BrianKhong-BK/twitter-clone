import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { fetchPostsByUser } from "../features/posts/postsSlice";

export default function ProfileMidBody() {
  const url =
    "https://firebasestorage.googleapis.com/v0/b/twitter-app-9bbb5.firebasestorage.app/o/cover.jpg?alt=media&token=6df34ac8-eb3e-4352-8b41-a22bf73b4510 ";
  const pic =
    "https://firebasestorage.googleapis.com/v0/b/twitter-app-9bbb5.firebasestorage.app/o/profile.jpg?alt=media&token=60bdc024-d27e-4cd2-af1b-cb117fbffa8e";

  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts.posts);
  const loading = useSelector((store) => store.posts.loading);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchPostsByUser(currentUser?.uid));
  }, [dispatch, currentUser]);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const userId = decodedToken.id;
  //     dispatch(fetchPostsByUser(userId));
  //   }
  // }, [dispatch]);

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
      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )}
      {posts.length > 0 ? (
        posts.map((post) => <ProfilePostCard key={post.id} post={post} />)
      ) : (
        <p>No posts yet</p>
      )}
    </Col>
  );
}
