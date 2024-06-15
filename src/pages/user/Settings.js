/* eslint-disable arrow-body-style */
import React from 'react';
import {Link} from 'react-router-dom'

const Account = () => { 

  return (
    <main className="app-py-1" style={{ height: '100vh' }}>
      <div className="fade-appear-done fade-enter-done">
        <br />
        <h1 className="center">Set Wallet Address</h1>
        <br />
        <div className="container">
          <div className="row">
            <div className="col l6 s12 offset-l3">
              <ul className="collection">
                <Link className="collection-item bg" to="#">
                  <li>
                    <div
                      style={{
                        padding: '1rem 1rem 0.8rem',
                        background: 'rgb(50, 167, 226)',
                        borderRadius: '10px',
                        display: 'inline-block',
                        marginRight: '1rem',
                      }}
                    >
                      <span
                        className="material-icons notranslate"
                        style={{ fontSize: '30px', margin: '0px', padding: '0px', color: 'white' }}
                      >
                        person
                      </span>
                    </div>
                    Upload Barcodes
                  </li>
                </Link>
                <Link className="collection-item bg" to="#">
                  <li>
                    <div
                      style={{
                        padding: '1rem 1rem 0.8rem',
                        background: 'rgb(50, 167, 226)',
                        borderRadius: '10px',
                        display: 'inline-block',
                        marginRight: '1rem',
                      }}
                    >
                      <span
                        className="material-icons notranslate"
                        style={{ fontSize: '30px', margin: '0px', padding: '0px', color: 'white' }}
                      >
                        person
                      </span>
                    </div>
                    Set Wallet Address
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
