import { useParams } from "react-router-dom";
import ProductList from "../components/products/ProductList";
import CollectionList from "./CollectionList";
import { Row, Container } from "react-bootstrap";
const HomePage = () => {
  const { keyword } = useParams();

  return (
    <>
      <Container>
        <Row>
          <ProductList keyword={keyword} />
          <CollectionList />
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
