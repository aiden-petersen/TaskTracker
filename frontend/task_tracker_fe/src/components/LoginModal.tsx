import React from "react";

type LoginModalProps = {
    displayLoginModal: boolean;
}

class LoginModal extends React.Component<LoginModalProps, {}> {
    render() {
        if (this.props.displayLoginModal) {
            return (
                <div className="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else return (<div></div>)
    }
}

export default LoginModal;
