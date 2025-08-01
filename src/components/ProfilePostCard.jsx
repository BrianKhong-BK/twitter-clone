import { Button, Col, Image, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { likePost, removeLikeFromPost } from "../features/posts/postsSlice";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
  const { content, id: postId, imageUrl } = post;
  const [likes, setLikes] = useState(post.likes || []);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const isLiked = likes.includes(userId);

  const pic =
    "https://firebasestorage.googleapis.com/v0/b/twitter-app-9bbb5.firebasestorage.app/o/profile.jpg?alt=media&token=60bdc024-d27e-4cd2-af1b-cb117fbffa8e";

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleShowUpdateModal = () => setShowUpdateModal(true);

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

  const addToLikes = () => {
    setLikes([...likes, userId]);
    dispatch(likePost({ userId, postId }));
  };

  const removeFromLikes = () => {
    setLikes(likes.filter((id) => id !== userId));
    dispatch(removeLikeFromPost({ userId, postId }));
  };

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
        <Image src={imageUrl} style={{ width: 150 }} />
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat" />
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat" />
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? (
              <i className="bi bi-heart-fill text-danger me-1"></i>
            ) : (
              <i className="bi bi-heart me-1"></i>
            )}
            {likes.length}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up" />
          </Button>
          <Button variant="light">
            <i className="bi bi-upload" />
          </Button>
          <Button variant="light">
            <i
              className="bi bi-pencil-square"
              onClick={handleShowUpdateModal}
            />
          </Button>
          <Button variant="light">
            <i className="bi bi-trash" />
          </Button>
          <UpdatePostModal
            show={showUpdateModal}
            handleClose={handleCloseUpdateModal}
            postId={postId}
            originalPostContent={content}
          />
        </div>
      </Col>
    </Row>
  );
}
