import { useEffect, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { Link,useLocation,useNavigate } from "react-router-dom";
import {login} from "../Redux/Actions/UserActions";
import Error from "../components/ui/Error";
import Spiner from "../components/ui/Spiner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state)=>state.userLogin)
  const {error, loading, userInfo} = userLogin;

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
  };

  return (
    <Container fluid="sm">
      {error && <Error variant={"alert-danger"}>{error}</Error>}
      {loading && <Spiner/>}
      <Card className="text-center" style={{ width: "18rem" }}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Card.Body>
            <Button type="submit">Login</Button>
          </Card.Body>

          <Link to={redirect ? `/register?redirect=${redirect}`: "/register"}>Create Account</Link>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
