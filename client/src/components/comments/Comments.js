import { HandThumbsUpFill, HandThumbsDownFill } from "react-bootstrap-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button, Card, Col } from "react-bootstrap";

const Comments = ({ valueL, valueD, text }) => {
  return (
    <>
      <Card.Text>Author:Janek</Card.Text>
      <Card.Text>{text}</Card.Text>
      <ButtonGroup aria-label="likes">
        <Col>
          <Button>
            <HandThumbsUpFill />
          </Button>
          <Card.Text>{valueL}</Card.Text>
        </Col>
        <Col>
          <Button>
            <HandThumbsDownFill />
          </Button>
          <Card.Text>{valueD}</Card.Text>
        </Col>
      </ButtonGroup>
    </>
  );
};

export default Comments;
