import React from "react";

type NavbarProps = {
    clickLogInLogOut: () => any
    isLoggedIn: boolean
}

class Navbar extends React.Component<NavbarProps, {}> {
    render() {
        return (
            <div className="navbar" >
                <div className="navbar-right">
                    <button type="button" className="btn btn-dark" onClick={this.props.clickLogInLogOut}>{this.props.isLoggedIn ? "Sign out" : "Log in"}</button>
                </div>
            </div>
        )
    }
}

export default Navbar;
