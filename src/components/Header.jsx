import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <div className="navbar heading navbar-expand-lg bg-body-tertiary">
          <div className="header-mobile px-md-4  d-flex justify-content-between pe-4 align-items-center w-100">
            <a className="navbar-logo" href="#">
              <img src="img/Group 928.png" alt="logo" />
            </a>

            <button className="hamburger-btn">
              <img src="img/menu 1.png" alt="Menu" className="hamburger-icon" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
