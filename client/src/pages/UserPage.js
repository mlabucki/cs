// Every user has its personal page where they can mange list of collections (create new, delete, or edit) — each collection in the list is a link to the collection page that contains table of items with sorting/filtering and capabilities to create new item, edit or delete existing item).
import { useEffect , useState} from "react";
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

  const userDetails = useSelector((state) => state.userDetails);
  const { error: detailsError, loading: detailsLoading } = userDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { error: myListError, loading: myListLoading, orders } = orderListMy;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const {loading: updatedLoading } = userUpdateProfile;
  const updateFormHandler = () => {
    setUpdateForm(prev => setUpdateForm(!prev))
  }

  useEffect(() => {
    dispatch(getUserDetails("profile"));
    dispatch(getListMyOrders());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          

          <Card>
          <Button onClick={updateFormHandler}>Update Profile</Button>
            {detailsError && (
              <Error variant={"alert-danger"}>{detailsError}</Error>
            )}
            {detailsLoading && <Spiner />}
            {updateForm && (
            <UserProfileUpdate />
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>The {userInfo.name}'s Collection List</Card.Title>
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
                        <th>User Id</th>
                      </tr>
                    </thead>
                    {orders.map((item) => (
                      <tbody key={item._id}>
                        <tr>
                          <td>
                            <Link to={`/orders/${item._id}`}>
                            {item._id}
                            </Link>
                            </td>
                          <td>{item.user}</td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                )}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              Collections : {orders ? orders.length : 0}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
