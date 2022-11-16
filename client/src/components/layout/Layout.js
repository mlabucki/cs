
import { Container } from "react-bootstrap/";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../Redux/Actions/UserActions";
import Header from "./Header";

function Layout(props) {

  
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };



  return (
    <div>
      <header>
        <Header
          userInfo={userInfo}
          logoutHandler={logoutHandler}
   
        />
      </header>

      <main>
        <Container variant className="mt-5" fluid="sm">
          {props.children}
        </Container>
      </main>
    </div>
  );
}

export default Layout;
