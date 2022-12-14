import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Spiner from "../ui/Spiner";
import Error from "../ui/Error";

const ProductList = ({ keyword }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <Row sm={3} xl={4}>
      {loading ? (
        <div className="mb-10">
          <Spiner />
        </div>
      ) : error ? (
        <Error variant="alert-danger">{error}</Error>
      ) : (
        <Col className="col-6">
          <Card className="productlist">
            <Card.Title>Products</Card.Title>
            {products.map((product) => {
              return (
                <>
                  <Card.Body key={product._id}>
                    <Card.Img variant="top" src={product.image} />

                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.text}</Card.Text>
                    <Card.Text>{product.price} $</Card.Text>
                    <Link to={`/products/${product._id}`}>
                      <Button variant="primary">`Check details`</Button>
                    </Link>
                  </Card.Body>
                </>
              );
            })}
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default ProductList;
