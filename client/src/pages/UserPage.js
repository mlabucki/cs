import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/Actions/UserActions";
import Error from "../components/ui/Error";
import Spiner from "../components/ui/Spiner";
import UserProfileUpdate from "./UserProfileUpdate";
import { getListMyOrders } from "../Redux/Actions/OrderActions";

const UserPage = () => {
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { error: myListError, loading: myListLoading, orders } = orderListMy;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: detailsError, loading: detailsLoading } = userDetails;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const {loading: updatedLoading } = userUpdateProfile;
  
  const updateFormHandler = () => {
    setUpdateForm((prev) => setUpdateForm(!prev));
  };

  useEffect(() => {
    dispatch(getListMyOrders());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            {updateForm === false ? (
              <Button onClick={updateFormHandler}>Update Profile</Button>
            ) : (
              <Button onClick={updateFormHandler}>
                Collapse a Update Form
              </Button>
            )}
            {detailsError && (
              <Error variant={"alert-danger"}>{detailsError}</Error>
            )}
            {detailsLoading && <Spiner />}
            {updateForm && <UserProfileUpdate />}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title> {userInfo.name}'s Collection List</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                {myListLoading ? (
                  <Spiner />
                ) : myListError ? (
                  <Error>{myListError}</Error>
                ) : (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    {orders.map((item) => (
                      <tbody key={item._id}>
                        <tr>
                          <td>
                            <Link to={`/orders/${item._id}`}>{item._id}</Link>
                          </td>
                          <td>{ moment(item.updatedAt).calendar()}</td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                )}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              Amount of Collections : {orders ? orders.length : 0}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
