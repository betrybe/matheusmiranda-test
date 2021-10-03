import React from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/company-name.png';

import './header.css';

const Header = () => {
  const userEmail = useSelector((state) => state.user.email);

  return (
    <header>
      <div className="header-wrapper">
        <img className="company-logo" src={ logo } alt="company-logo" />
        <div className="credential-info">
          <p data-testid="email-field">
            Email:
            {userEmail}
          </p>
          <p data-testid="total-field">
            Despesa Total: R$
            <span data-testid="header-currency-field" />
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
