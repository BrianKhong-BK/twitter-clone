import { Button, Col, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function ProfilePostCard({ content, id }) {
  const [likes, setLikes] = useState(0);
  const pic = "src/images/profile.jpg";

  useEffect(() => {
    fetch(
      `https://e7000416-eb00-4f1e-a87e-46a44215795e-00-12uzm3id8zp2g.pike.replit.dev/likes/post/${id}`
    )
      .then((response) => response.json())
      .then((data) => setLikes(data.length))
      .catch((error) => console.error("Error: ", error));
  }, [id]);

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>

      <Col>
        <strong>Brian</strong>
        <span>@brian.khong . May 14</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat" />
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat" />
          </Button>
          <Button variant="light">
            <i className="bi bi-heart" /> {likes}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up" />
          </Button>
          <Button variant="light">
            <i className="bi bi-upload" />
          </Button>
        </div>
      </Col>
    </Row>
  );
}
