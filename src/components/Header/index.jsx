import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import "./style.scss";

export class Header extends Component {
  render() {
    const { toggled } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white static-top navbar-sme fixed-top">
          <div className="container-fluid">
            <div className={`nav-bar ${toggled && "toggled"}`}>
              <Link className="navbar-brand" to="/">
                <img
                  src={
                    process.env.PUBLIC_URL
                      ? `/${process.env.PUBLIC_URL}/assets/images/logo-pedidouniformes.png`
                      : "/assets/images/logo-pedidouniformes.png"
                  }
                  alt=""
                />
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li onClick={() => authService.logout()} className="nav-item">
                  <Link className="nav-link">
                    <img
                      src={
                        process.env.PUBLIC_URL
                          ? `/${process.env.PUBLIC_URL}/assets/images/sair.png`
                          : "/assets/images/sair.png"
                      }
                      alt="Ícone de logout"
                    />
                  </Link>
                  <p className="title">Sair</p>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
