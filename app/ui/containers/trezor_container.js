import { connect } from 'react-redux';
import Trezor from '../components/trezor';
import {
    login,
    setErrorMessage,
    clearErrorMessage,
    setRegisterStateNext,
    setRegisterStateBack,
    setRegisterState,
    register,
    cancelAuthReq
} from '../actions/auth_action';
import { showToaster } from '../actions/toaster_action';

const mapStateToProps = state => (
{
    networkStatus: state.networkStatus.networkStatus,
    registerState: state.auth.registerState,
    authenticated: state.auth.authenticated,
    authProcessing: state.auth.authProcessing,
    user: state.auth.user,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg
}
);

const mapDispatchToProps = dispatch => (
{
    userLogin: payload => (dispatch(login(payload))),
    showToaster: (message, options) => (dispatch(showToaster(message, options))),
    setErrorMessage: msg => (dispatch(setErrorMessage(msg))),
    clearErrorMessage: () => (dispatch(clearErrorMessage())),
    stateContinue: user => (dispatch(setRegisterStateNext(user))),
    stateBack: () => (dispatch(setRegisterStateBack())),
    setRegisterState: navState => (dispatch(setRegisterState(navState))),
    userRegister: payload => (dispatch(register(payload))),
    cancelAuthReq: () => (dispatch(cancelAuthReq())),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Trezor);
