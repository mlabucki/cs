import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createproductReview,
  listProductDetail,
} from "../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";
import Spiner from "../components/ui/Spiner";
import Error from "../components/ui/Error";
import Comments from "../components/comments/Comments";

import { Col, Card, Container, Row, Button, Form } from "react-bootstrap";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstant";

const ProductDetails = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");

  const { _id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: createReviewLoading,
    error: createReviewError,
    success: createReviewSuccess,
  } = productReviewCreate;

  useEffect(() => {
    if (createReviewSuccess) {
      alert("Review Submitted");
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetail(_id));
  }, [_id, dispatch, createReviewSuccess]);

  const AddToCollectionHandle = (e) => {
    e.preventDefault();

    navigate(`/collection/${_id}?qty=${qty}`);
  };

  const submitFormHandler = () => {
    
    dispatch(
      createproductReview(_id, {
        comment,
      })
    );
  };

  return (
    <>
      <Container>
        {loading ? (
          <Spiner />
        ) : error ? (
          <Error variant="alert-danger">{createReviewError}</Error>
        ) : (
          <>
            <Row>
              <Col xl={6}>
                <Card key={product._id} className="productlist">
                  <Card.Img variant="top" src={product.image} />
                </Card>
              </Col>
              <Col xl={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.text}</Card.Text>
                    {!product.countInStock === 0 ? (
                      <Card.Text>{product.price} $</Card.Text>
                    ) : null}
                    <Card.Text>
                      Status of product:
                      {product.countInStock > 0
                        ? " Hurry Up! Thee are fiew models in stock!"
                        : ` Don't miss next time. The product is sold out`}
                    </Card.Text>

                    {product.countInStock > 0 ? (
                      <>
                        <Card.Text>
                          Quantity : {product.countInStock}
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
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
                    {createReviewLoading && <Spiner />}
                    {createReviewError && (
                      <Error variant="alert-danger">{createReviewError}</Error>
                    )}
                    <Card.Title>Comments for {product.title}</Card.Title>
                    {product.reviews?.lenght === 0 && (
                      <Card.Text>No Comments</Card.Text>
                    )}
                    {product.reviews?.map((review) => (
                      <Col key={review._id}>
                        <Comments review={review} />
                      </Col>
                    ))}
                    {userInfo ? (
                      <Card.Body>
                        <Form className="mb-3"  onSubmit={submitFormHandler}>
                          <Form.Label>Add New Comment</Form.Label>
                          <Form.Control
                            placeholder="Please add comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <Button type="submit">Add Comment</Button>
                        </Form>
                      </Card.Body>
                    ) : (
                      <Card.Text>
                        Please <Link to="/login"> login </Link>
                        to post a comment
                      </Card.Text>
                    )}
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
