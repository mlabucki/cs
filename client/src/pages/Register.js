import { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate,Link } from "react-router-dom";
import Error from "../components/ui/Error";
import Spiner from "../components/ui/Spiner";
import { register } from "../Redux/Actions/UserActions";


const Register = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <Container fluid="sm">
      {error && <Error variant={"alert-danger"}>{error}</Error>}
      {loading && <Spiner />}
      <Card className="text-center" style={{ width: "18rem" }}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              required
              id="name"
              placeholder="Nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Card.Body>
            <Button type="submit">Register</Button>
          </Card.Body>
          <Link to={redirect ? `/login?redirect=${redirect}`: "/login"}>Login</Link>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
