import { useParams } from "react-router-dom";
import ProductList from "../components/products/ProductList";

const HomePage = () => {
  const { keyword } = useParams();

  return (
    // <the newest collection list/>
    <ProductList keyword={keyword} />
  );
};

export default HomePage;
