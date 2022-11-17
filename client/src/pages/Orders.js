import { useEffect } from "react";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../components/ui/Error";
import Spiner from "../components/ui/Spiner";
import { getOrderDetails } from "../Redux/Actions/OrderActions";

const Orders = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderId = id;
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const collectionHandler = () => {
    navigate("/userpage");
  };

  return (
    <>
      {loading ? (
        <Spiner />
      ) : error ? (
        <Error variant="alert-danger">{error}</Error>
      ) : (
        <>
          <Row>
            <Col xl={6}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Collection of user:
                    <Link to={`/userpage`}>{order.user.name}</Link>
                    <p>Collection Name: {order.collectionName}</p>
                  </Card.Title>
                  {order.orderItems.length === 0 ? (
                    <Error variant="alert-info">Your order is empty</Error>
                  ) : (
                    <>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Price $</th>
                          </tr>
                        </thead>
                        {order.orderItems.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <Link to={`/products/${item.product}`}>
                                  {item.title}
                                </Link>
                              </td>

                              <td>{item.qty}</td>
                              <td>{item.price}</td>
                            </tr>
                          </tbody>
                        ))}
                      </Table>
                    </>
                  )}
                </Card.Body>
                <Card.Footer>
                  <Button onClick={collectionHandler}>
                    Create New Collection
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Orders;
