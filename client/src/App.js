import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProductList from "./components/products/ProductList";
import HomePage from "./pages/HomePage";
import AddNewProduct from "./components/products/AddNewProduct";
import ProductDetails from "./pages/ProductDetails";
import Collections from "./pages/Collections";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/new" element={<AddNewProduct />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/collection/:id" element={<Collections />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:_id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
