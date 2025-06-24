import { Button, Col, Image, Row } from "react-bootstrap";

export default function ProfilePostCard() {
  const pic = "src/images/profile.jpg";

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
        <p>Sleepy zzz</p>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat" />
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat" />
          </Button>
          <Button variant="light">
            <i className="bi bi-heart" />
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
