import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Table } from "react-bootstrap";

import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Error from "../components/ui/Error";
import { Button } from "react-bootstrap";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collection = useSelector((state) => state.collection);
  const { collectionDetails } = collection;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (!collectionDetails) {
      navigate("/collection-details");
    } else if (success) {
      navigate(`/orders/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [collectionDetails, dispatch, success, order, navigate]);

  const placeOrderHandler = (e) => {
    e.preventDefault();

    dispatch(
      createOrder({
        orderItems: collection.collectionItems,
        collectionDetails: collection.collectionDetails,
      })
    );
  };

  const addProductsHandler = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <>
      {error && <Error variant="alert-danger">{error}</Error>}
      <Col>
        <Card>
          <Card.Header>Owner</Card.Header>
          <p>user:{userInfo.name}</p>
          <p>Email - {userInfo.email}</p>
          <p>Collection Name: {collectionDetails.collectionName}</p>
        </Card>

        <Card>
          <Card.Header>Summary</Card.Header>

          {collection.collectionItems &&
          collection.collectionItems.length === 0 ? (
            <Error variant="alert-info">
              Collection is empty
              <Button onClick={addProductsHandler}>Add products</Button>
            </Error>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              {collection.collectionItems.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/products/${item.product}`}>{item.title}</Link>
                    </td>
                    <td>{item.qty}</td>
                    <td>{item.price}$</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          )}

          {collection.collectionItems.length === 0 ? null : (
            <Button onClick={placeOrderHandler}>Create Collection</Button>
          )}
        </Card>
      </Col>
    </>
  );
};

export default PlaceOrder;
