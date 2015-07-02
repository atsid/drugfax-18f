"use strict";

let React = require("react/addons");
let ReactToastr = require("react-toastr");
let {ToastContainer} = ReactToastr;
let ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
const toastOptions = {
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

let Toast = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },

    componentDidMount() {
        if (this.props.store) {
            this.props.store.addMessageListener(this.onMessage);
        }
    },

    componentWillUnmount() {
        if (this.props.store) {
            this.props.store.removeMessageListener(this.onMessage);
        }
    },

    /**
     * When a message is received, show it
     * @param message The message that was received in the message store
     */
    onMessage(message) {
        this.props.store.removeMessage(message);
        this.refs.container[message.type](message.text, "", toastOptions);
    },

    render() {
        return (
            <ToastContainer toastMessageFactory={ToastMessageFactory} ref="container" closeButton={true} className="toast-top-right" />
        );
    }
});

module.exports = Toast;
