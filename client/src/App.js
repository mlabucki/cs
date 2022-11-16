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
import Orders from "./pages/Orders";
import CollectionDetails from "./pages/CollectionDetails";
import  PrivateRoute  from "./pages/PrivateRoute";



function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/search/:keyword" exact element={<HomePage />} />
        
        <Route path="/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>} />

        <Route path="/new" element={<PrivateRoute><AddNewProduct /></PrivateRoute>} />
        
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<Orders />} />
        
        <Route path="/collection/:id" element={<PrivateRoute><Collections /></PrivateRoute>} />
        <Route path="/collection-details" element={<PrivateRoute><CollectionDetails /></PrivateRoute>} />
        
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:_id" element={<ProductDetails />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
