/**
 * Created by two on 28/09/16.
 */

import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { MESSAGES } from '../constant';

export default class TrezorAccountForm extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        networkStatus: PropTypes.number.isRequired,
        showToaster: PropTypes.func.isRequired,
        userRegister: PropTypes.func.isRequired,
        stateBack: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.handleTrezorAccountName = this.handleTrezorAccountName.bind(this);
    }

    handleTrezorAccountName() {

    }

    render() {
        return (
            <div className="auth-intro-cnt">
                <h3 className="title">Account Name</h3>
                <div className="desc">
                    Your 'account' is unique. It is mapped to the specific keys on the trezor device. <b>Do not forget your accounts</b>.
                    This is <b>not</b> a required field.
                </div>
                <div className="form-b">
                    <form className="form" name="loginForm">
                        <div>
                            <input
                                id="trezorAccount"
                                ref={c => { this.trezorAccount = c; }}
                                required="true"
                                autoFocus
                            />
                        </div>
                        <div className="inp-btn">
                        </div>
                    </form>
                </div>
                <div className="opt">
                    <div className="opt-i lt">
                        <button
                            type="button"
                            className="btn"
                            name="back"
                            onClick={() => {
                                this.props.stateBack();
                            }}
                        >Back</button>
                    </div>
                    <div className="opt-i">
                        <button
                            type="submit"
                            className="btn"
                            name="continue"
                            onClick={() => {
                                this.props.stateContinue();
                            }}
                        >Login</button>
                    </div>
                </div>
            </div>
        )}
}

