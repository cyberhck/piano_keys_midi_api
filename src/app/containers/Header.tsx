import * as React from "react";
import {connect} from "react-redux";
import {ConnectedLink} from "react-router5";
import {stylesheet} from "typestyle";

const classNames = stylesheet({
  activeLink: {
    textDecoration: "underline"
  },
  nav: {
    $nest: {
      ul: {
        $nest: {
          li: {
            display: "inline",
            padding: "5px"
          }
        },
        listStyleType: "none",
        padding: 0
      }
    }
  }
});

class Header extends React.Component {
  public render(): JSX.Element {
    return (
      <nav className={classNames.nav}>
        <ul>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName="home">
              Home
            </ConnectedLink>
          </li>
        </ul>
      </nav>
    );
  }
}

const connected = connect()(Header);
export {connected as Header, Header as UnconnectedHeader};
