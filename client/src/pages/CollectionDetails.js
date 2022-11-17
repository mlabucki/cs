import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Row, Col, Card, Button, Container } from "react-bootstrap";

import { saveCollectionDetails } from "../Redux/Actions/CollectionActions";

const CollectionDetails = () => {
  const collection = useSelector((state) => state.collection);
  const { collectionDetails, collectionItems } = collection;

  const [collectionName, setCollectionName] = useState(
    collectionDetails?.collectionName
  );
  const [tag, setTag] = useState(collectionDetails?.tag);
  const [topic, setTopic] = useState(collectionDetails?.topic);
  const [description, setDescription] = useState(
    collectionDetails?.description
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveCollectionDetails({
        collectionName,
        tag,
        topic,
        description,
      })
    );
    navigate("/placeorder");
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Card className="text-center" style={{ width: "18rem" }} fluid>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Collection Name</Form.Label>
              <Form.Control
                type="text"
                required
                id="collectionName"
                placeholder="Collection Name"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Collection Tag</Form.Label>
              <Form.Control
                type="text"
                required
                id="tag"
                placeholder="Collection Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                id="description"
                required
                placeholder="Collection Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                id="topic"
                required
                placeholder="Collection Description"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </Form.Group>

            <Button type="submit">Confirm</Button>
          </Form>
        </Card>
      </Row>
    </Container>
  );
};

export default CollectionDetails;
