import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";
import Spiner from "../components/ui/Spiner";
import Error from "../components/ui/Error";
import Comments from "../components/comments/Comments";

import { Col, Card, Container, Row, Button } from "react-bootstrap";
import classes from "./ProductDetails.module.css";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const { _id } = useParams();
  
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetail(_id));
  }, [_id, dispatch]);

  const AddToCollectionHandle = (e) => {
    e.preventDefault();

    navigate(`/collection/${_id}?qty=${qty}`);
  };

  return (
    <>
      <Container>
        {loading ? (
          <Spiner />
        ) : error ? (
          <Error variant="alert-danger">{error}</Error>
        ) : (
          <>
            <Row>
              <Col xl={6} className={classes.productcolumn}>
                <Card key={product._id} className="productlist">
                  <Card.Img variant="top" src={product.image} />
                </Card>
              </Col>
              <Col xl={6} className={classes.productcolumn}>
                <Card>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.text}</Card.Text>
                    <Card.Text>{product.price} $</Card.Text>
                    <Card.Text>
                      Status:
                      {product.countInStock > 0
                        ? " Hurry Up! Thee are fiew models in stock!"
                        : ` Don't miss next time. The product is sold out`}
                    </Card.Text>

                    {product.countInStock > 0 ? (
                      <>
                        <Card.Text>
                          Quantity : {product.countInStock}
                          <select value={qty}
                          onChange={(e)=>setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (p) => (
                                <option key={p + 1} value={p + 1}>
                                  {p + 1}
                                </option>
                              )
                            )}
                          </select>
                        </Card.Text>
                        <Button onClick={AddToCollectionHandle}>
                          Add to Collection
                        </Button>
                      </>
                    ) : null}
                  </Card.Body>
                  <Card.Body>
                    <Card.Title>Comments:</Card.Title>

                    <Comments
                      // text={product.reviews}
                      text="Great model for the beginners"
                      valueL={1}
                      valueD={2}
                    />

                    <Card.Text>{product.reviews}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductDetails;
