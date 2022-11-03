import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap/";
import { Container } from "react-bootstrap";
import { useRef } from "react";

const AddNewProduct = (props) => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const textInputRef = useRef();
  const priceInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredText = textInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;

    const productData = {
      title: enteredTitle,
      image: enteredImage,
      text: enteredText,
      price: enteredPrice,
    };

    props.onAddProduct(productData);
  };

  return (
    <Container fluid="sm">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Product title</Form.Label>

          <Form.Control type="text" required id="title" ref={titleInputRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product image</Form.Label>
          <Form.Control type="url" required id="image" ref={imageInputRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product text</Form.Label>
          <Form.Control rows={3} type="text" required id="text" ref={textInputRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product price</Form.Label>
          <Form.Control id="price" required rows="5" ref={priceInputRef} />
        </Form.Group>
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddNewProduct;
