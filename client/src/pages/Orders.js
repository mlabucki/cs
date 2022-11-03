import { Col, Container, Row, Card, Table } from "react-bootstrap";

import Spiner from "../components/ui/Spiner";
import Error from "../components/ui/Error";

const Orders = ({ loading, error, orders }) => {
  return (
    <>
      {loading ? (
        <Spiner />
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <>
          {orders.length === 0 ? (
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Text>Colection is Empty</Card.Text>
                    {/* <Link to={"/products"}>
                      Start creating your collection, using our products!
                    </Link> */}
                  </Card>
                </Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        
                        <th>Id</th>
                        <th>Items</th>
                      </tr>
                    </thead>
                    {orders.map((item) => (
                      <tbody key={item._id}>
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.orderItems.title}</td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
