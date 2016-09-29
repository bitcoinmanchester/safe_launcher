import React, { Component, PropTypes } from 'react';
import trezor from 'trezor.js/lib/node.js'

export default class TrezorAccountInfo extends Component {
    static propTypes = {
        stateContinue: PropTypes.func.isRequired,
        stateBack: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.handleConnection = this.handleConnection.bind(this);
    }

    handleConnection() {
        var debug = true;

        var list = new trezor.DeviceList({debug: debug});

        list.on('connect', function (device) {
            if (debug) {
                console.log('Connected a device:', device);
                console.log('Devices:', list.asArray());
            }
            console.log("Connected device " + device.features.label);

            // What to do on user interactions:
            device.on('button', function (code) {
                buttonCallback(device.features.label, code);
            });
            device.on('passphrase', passphraseCallback);
            device.on('pin', pinCallback);

            // For convenience, device emits 'disconnect' event on disconnection.
            device.on('disconnect', function () {
                if (debug) {
                    console.log('Disconnected an opened device');
                }
            });

            // You generally want to filter out devices connected in bootloader mode:
            if (device.isBootloader()) {
                throw new Error('Device is in bootloader mode, re-connected it');
            }

            var hardeningConstant = 0x80000000;

            // low level API
            device.waitForSessionAndRun(function (session) {
                if (debug) {
                    console.log("I will call now.");
                }
                return session.typedCall("GetEntropy", "Entropy", {size: 10}).then(entropy => {
                    if (debug) {
                        console.log("I have called now.");
                    }
                    console.log("Random hex-string is " + entropy.message.entropy);
                });
            }).then(function () {

                // high level API

                // Ask the device to show first address of first account on display and return it
                return device.waitForSessionAndRun(function (session) {
                    return session.getAddress([
                        (44 | hardeningConstant) >>> 0,
                        (0 | hardeningConstant) >>> 0,
                        (0 | hardeningConstant) >>> 0,
                        0,
                        0
                    ], 'bitcoin', true)
                })
                    .then(function (result) {
                        console.log('Address:', result.message.address);
                    })
            })

                .catch(function (error) {
                    // Errors can happen easily, i.e. when device is disconnected or request rejected
                    // Note: if there is general error handler, that listens on device.on('error'),
                    // both this and the general error handler gets called
                    console.error('Call rejected:', error);
                });
        });

        // This gets called on general error of the devicelist (no transport, etc)
        list.on('error', function (error) {
            console.error('List error:', error);
        });

// On connecting unacquired device
        list.on('connectUnacquired', function (device) {
            askUserForceAcquire(function () {
                device.steal().then(function () {
                    console.log("steal done. now wait for another connect");
                });
            });
        });

// an example function, that asks user for acquiring and
// calls callback if use agrees
// (in here, we will call agree always, since it's just an example)
        function askUserForceAcquire(callback) {
            return setTimeout(callback, 1000);
        }

        /**
         * @param {string}
         */
        function buttonCallback(label, code) {
            if (debug) {
                // We can (but don't necessarily have to) show something to the user, such
                // as 'look at your device'.
                // Codes are in the format ButtonRequest_[type] where [type] is one of the
                // types, defined here:
                // https://github.com/trezor/trezor-common/blob/master/protob/types.proto#L78-L89
                console.log('User is now asked for an action on device', code);
            }
            console.log("Look at device " + label + " and press the button, human.");
        }

        /**
         * @param {Function<Error, string>} callback
         */
        function passphraseCallback(callback) {
            console.log('Please enter passphrase.');

            // note - disconnecting the device should trigger process.stdin.pause too, but that
            // would complicate the code

            // we would need to pass device in the function and call device.on('disconnect', ...

            process.stdin.resume();
            process.stdin.on('data', function (buffer) {
                var text = buffer.toString().replace(/\n$/, "");
                process.stdin.pause();
                callback(null, text);
            });
        }

        /**
         * @param {string} type
         * @param {Function<Error, string>} callback
         */
        function pinCallback(type, callback) {
            console.log('Please enter PIN. The positions:');
            console.log('7 8 9');
            console.log('4 5 6');
            console.log('1 2 3');

            // note - disconnecting the device should trigger process.stdin.pause too, but that
            // would complicate the code

            // we would need to pass device in the function and call device.on('disconnect', ...

            process.stdin.resume();
            process.stdin.on('data', function (buffer) {
                var text = buffer.toString().replace(/\n$/, "");
                process.stdin.pause();
                callback(null, text);
            });
        }

// you should do this to release devices on exit
        process.on('exit', function () {
            list.onbeforeunload();
        });
    }

    render() {
        return (
            <div className="auth-intro-cnt">
                <h3 className="title">Connecting...</h3>
                <div className="opt">
                    <div className="opt-i lt">
                        <button
                            type="button"
                            className="btn"
                            name="back"
                            onClick={() => {
                                this.props.stateBack();
                            }}
                        >Back
                        </button>
                    </div>
                    <div className="opt-i">
                        <button
                            type="submit"
                            className="btn"
                            name="continue"
                            onClick={() => {
                                this.props.stateContinue();
                            }}
                        >Login
                        </button>
                    </div>
                </div>
                <div onLoad={ this.handleConnection() }></div>
            </div>
        )
    }
}

