import { useEffect } from "react";
import { Col, Container, Row, Card, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import {
  addToCollection,
  removeFromCollection,
} from "../Redux/Actions/CollectionActions";

const Collections = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const productId = id;

  const qty = search ? Number(search.split("=")[1]) : 1;

  const collection = useSelector((state) => state.collection);
  const { collectionItems } = collection;

  const removeFromCollectionHandle = (productId) => {
    dispatch(removeFromCollection(productId));
  };



  useEffect(() => {
    if (productId) {
      dispatch(addToCollection(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = (e) => {
    e.preventDefault();
    
    navigate(`/collection-details`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title> Products ({collectionItems.length})</Card.Title>
              {collectionItems.length === 0 ? (
                <>
                  <h1>Your collection is empty</h1>
                  <Link to={`/products`}>
                    <Button>Create new Collection</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Collection image</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    {collectionItems.map((item) => (
                      <tbody key={item.product}>
                        <tr>
                          <td>1</td>
                          <td>
                            <Link to={`/products/${productId}`}>Product 1</Link>
                          </td>
                          <td>
                            <select
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCollection(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((p) => (
                                <option key={p + 1} value={p + 1}>
                                  {p + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>{item.productId}</td>
                          <td>{item.price}$</td>
                          <td>{item.image}</td>
                          <td>
                            Edit
                          </td>
                          <td>
                            <Button
                              onClick={() =>
                                removeFromCollectionHandle(item.product)
                              }
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </>
              )}

              <Card.Title>
                <Button onClick={checkOutHandler}>Create Collection</Button>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Collections;
