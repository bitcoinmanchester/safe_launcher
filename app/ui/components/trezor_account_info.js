import React, { Component, PropTypes } from 'react';

export default class TrezorAccountInfo extends Component {
    static propTypes = {
        stateContinue: PropTypes.func.isRequired,
        stateBack: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="auth-intro-cnt">
                <h3 className="title">Trezor Account</h3>
                <div className="desc">
                    The '<b>Trezor Account</b>' is used to unlock to access a specific account for your data.
                    If you forget the account name you will be unable to access you data, even with access to your Trezor.
                </div>
                <div className="auth-intro-media">
                    <img src="../images/trezor.svg" alt="Welcome to the Safe Launcher" />
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
                            type="button"
                            className="btn"
                            name="continue"
                            onClick={() => {
                                this.props.stateContinue();
                            }}
                        >Continue</button>
                    </div>
                </div>
            </div>
        );
    }
}
