import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, userDetails } from "../Redux/Actions/UserActions";
import Error from "../components/ui/Error";
import Spiner from "../components/ui/Spiner";

const UserProfileUpdate = () => {
 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updatedLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, loading]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("password doesn't match");
    } else {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
    }
  };
  return (
    <>
      {error && <Error variant={"alert-danger"}>{error}</Error>}
      {loading && <Spiner />}
      {updatedLoading && <Spiner />}

      <h1>User name: {user.name}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="text"
            required
            id="name"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Confirm Changes</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default UserProfileUpdate;
