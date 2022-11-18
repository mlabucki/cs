import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spiner from "../components/ui/Spiner";
import Error from "../components/ui/Error";
import { Col, Card, ListGroup } from "react-bootstrap";

import { getListMyOrders } from "../Redux/Actions/OrderActions";

const CollectionList = () => {
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { error, loading, orders } = orderListMy;

  useEffect(() => {
    dispatch(getListMyOrders());
  }, [dispatch]);

  return (
    <Col>
      <Card>
        <Card.Header>Collection</Card.Header>
        {loading ? (
          <Spiner />
        ) : error ? (
          <Error variant="alert-danger">{error}</Error>
        ) : (
          <ListGroup>
            {orders.map((item) => (
              <ListGroup.Item key={item._id}>
                <Link to="/products">{item.orderDetails.collectionName}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
    </Col>
  );
};

export default CollectionList;
