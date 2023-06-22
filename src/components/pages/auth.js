import { useHistory } from "react-router-use-history";
import Login from '../auth/login';
import loginImg from '../../images/auth/login.jpg';

export default function Auth(props) {
 


  const history = useHistory();

  const handleSuccessfulAuth = (authToken) => {
    props.handleSuccessfulLogin(authToken);
    history.push("/");
  };

  const handleUnsuccessfulAuth = () => {
    props.handleUnsuccessfulLogin();
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="left-column"
        style={{
          backgroundImage: `url(${loginImg})`,
        }}
      />

      <div className="right-column">
        <Login
          handleSuccessfulAuth={handleSuccessfulAuth}
          handleUnsuccessfulAuth={handleUnsuccessfulAuth}
        />
      </div>
    </div>
  );
}
