// import { HandThumbsUpFill, HandThumbsDownFill } from "react-bootstrap-icons";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import moment from "moment";
import { Card,  } from "react-bootstrap";

const Comments = ({ review }) => {
  return (
    <Card>
      <Card.Header>Author:{review.name}</Card.Header>
      <Card.Text>{review.comment}</Card.Text>
      <Card.Text>{moment(review.createdAt).calendar()}</Card.Text>
    </Card>
  );
};

export default Comments;
