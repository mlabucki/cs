import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Error from "../components/ui/Error";
import { Button,Form,Card,Row,Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { createOrder } from "../Redux/Actions/OrderActions";
import {  ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  // const [nameCollection, setNameCollection] = useState("");
  // const [descriptionCollection, setDescriptionCollection] = useState("");
  // const [topicCollection, setTopicCollection] = useState("");
  // const [tagCollection, setTagCollection] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const collection = useSelector((state) => state.collection);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state)=> state.orderCreate)
  const {order, success, error} = orderCreate

  useEffect(()=>{
    if(success){
      navigate(`/orders/${order._id}`)
      dispatch({type:ORDER_CREATE_RESET})
    }
  },[dispatch, success, order, navigate])

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
          orderItems: collection.collectionItems, 
      })
      )
  };


  return (
    <>
    {error && <Error variant="alert-danger">{error}</Error>}
      <div>
        <h2>user</h2>
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
      </div>
      <div>
        <h2>Summary</h2>
        {collection.collectionItems.length === 0 ? (
          <Error variant="alert-info">Collection is empty</Error>
        ) : (
          <>
            {collection.collectionItems.map((item) => (
              <div key={item._id}>
                <Link to={`/products/${item.product}`}>{item.title}</Link>
                <p>Quantity: {item.qty}</p>
                <p>Price: {item.price}</p>
              </div>
            ))}
          </>
        )}
       

        {collection.collectionItems.length === 0 ? null : (
          <Button onClick={placeOrderHandler}>Create Collection</Button>
        )}
        <Button>Back to Collection</Button>
        <Row>
        <Col>
          <Button>Create New Collection</Button>
          <Card>
            <Card.Title>Create New Collection Form</Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Collection Name</Form.Label>

                <Form.Control
                  type="text"
                  required
                  id="title"
                  placeholder="Collection name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Collection Tag</Form.Label>
                <Form.Control
                  type="url"
                  required
                  id="tag"
                  placeholder="Select Tag"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Collection topic</Form.Label>
                <Form.Control
                  rows={3}
                  type="text"
                  required
                  id="text"
                  placeholder="Collection Topic"
                />
              </Form.Group>
              <Button type="submit">Create Collection</Button>
            </Form>
          </Card>
        </Col>
      </Row>
      </div>
    </>
  );
};

export default PlaceOrder;
