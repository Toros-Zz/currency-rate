import PropTypes from "prop-types";

import "./StaticConvertedCurrency.css";

export const StaticConvertedCurrency = ({ titles, data }) => (
  <div className="StaticConvertedCurrency">
    <div className="StaticConvertedCurrency__item">
      <span className="StaticConvertedCurrency__value">{data.from}</span>
      <h6 className="StaticConvertedCurrency__title">{titles.from}</h6>
    </div>

    <div className="StaticConvertedCurrency__item">
      <span>→</span>
    </div>

    <div className="StaticConvertedCurrency__item">
      <span className="StaticConvertedCurrency__value">{data.to}</span>
      <h6 className="StaticConvertedCurrency__title">{titles.to}</h6>
    </div>
  </div>
);

StaticConvertedCurrency.propTypes = {
  titles: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
