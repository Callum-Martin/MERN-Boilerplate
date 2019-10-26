import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ onClick, mode }) => {
  return (
    <footer className="page-footer font-small bg-secondary pt-3 pb-3">
      <div id="copyrights">
        <div className="container">
          <div className="row">
            <div className="col-6">
              © {new Date().getFullYear()} All Rights Reserved by Company.
              <br />
              <div className="copyright-links">
                <Link to="/terms-of-service">Terms of Use</Link> /{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>

            <div className="col-6 text-right">
              <i className="icon-envelope1" /> support@company.com{' '}
              <span className="middot">&nbsp;</span>
              <div className="clear" />
              <div className="fright clearfix copyright-links">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://twitter.com/hashtag/Tagline?src=hash"
                >
                  #Tagline
                </a>{' '}
                <span className="middot">&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
