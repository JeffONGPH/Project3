import {connect} from 'react-redux';
import Login from '../components/Login';
import {loginUser, loginStatus as status} from '../actions/authentication';

const mapStateToProps = state => {
  const {loginStatus, errorMsg} = state.userAuthentication;
  const buttonText = loginStatus === status.IN_PROGRESS ? '◌' : 'Login';

  return {
    loginStatus,
    errorMsg,
    buttonText,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (componentState) => {
      if(componentState.usernameInput && componentState.passwordInput) {
        dispatch(loginUser({
          email: componentState.usernameInput, 
          password: componentState.passwordInput
        }));
      }
    },
    createAccount: e => {
      console.log(this);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);