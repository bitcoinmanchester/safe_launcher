import React, { Component, PropTypes } from 'react';
import className from 'classnames';
import TrezorAccountForm from './trezor_account_form.js';
import TrezorAccountInfo from './trezor_account_info.js';
import TrezorConnect from './trezor_connect.js';
import AuthLoader from './auth_loader';

export default class Trezor extends Component {
    static propTypes = {
        networkStatus: PropTypes.number.isRequired,
        registerState: PropTypes.number.isRequired,
        authProcessing: PropTypes.bool.isRequired,
       user: PropTypes.object.isRequired,
       error: PropTypes.object.isRequired,
       authenticated: PropTypes.bool.isRequired,
       stateContinue: PropTypes.func.isRequired,
       stateBack: PropTypes.func.isRequired,
       setRegisterState: PropTypes.func.isRequired,
       cancelAuthReq: PropTypes.func.isRequired,
       userRegister: PropTypes.func.isRequired,
       showToaster: PropTypes.func.isRequired
    };

    constructor() {
        super();
         this.loginTrezor = this.loginTrezor.bind(this);
         this.derive = this.derive.bind(this);
    }

    loginTrezor(e) {
        const currentTarget = e.currentTarget;

        const accountSecretVal = this.derive(key, '-Secret-', account);
        const accountPasswordVal = this.derive(key, '-Password-', account);
    }

    derive(key, type, account) {
        var crypto = require('crypto');
        return crypto.createHash('sha2').update(key + type + account).digest('hex');
    }

    render() {
        const { registerState, authProcessing, setRegisterState } = this.props;
        if (authProcessing) {
            return (<AuthLoader {...this.props} />);
        }

        let currentState = null;
        const TOTAL_STATES = 3;
        switch (registerState) {
            case 0:
                currentState = <TrezorAccountInfo {...this.props} />;
                break;
            case 1:
                currentState = <TrezorAccountForm {...this.props} />;
                break;
            case 2:
                currentState = <TrezorConnect {...this.props} />;
                break;
            default:
                throw new Error('Unknown Trezor State');
        }
        const stateNavs = [];
        let navClassNames = null;
        for (let i = 0; i < TOTAL_STATES; i++) {
            navClassNames = className(
                'auth-intro-nav-btn-i',
                { active: (i === registerState) }
            );
            stateNavs.push(
                <span
                    key={i}
                    className={navClassNames}
                    onClick={() => {
                        setRegisterState(i);
                    }}
                >{' '}</span>);
        }

        return (
            <div className="auth-intro form-b">
                <div className="auth-intro-b">
                    { currentState }
                    <div className="auth-intro-nav-btn">
                        { stateNavs }
                    </div>
                </div>
                <div className="form-f">
                    <div className="form-f-b no-border">
                        Regular login instead?
                        <a
                            href={undefined}
                            onClick={e => {
                                e.preventDefault();
                                this.context.router.push('/login');
                            }}
                        >Login</a>
                    </div>
                </div>
            </div>
        );
    }
}