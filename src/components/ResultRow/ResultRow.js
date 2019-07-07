import React from 'react';

import './ResultRow.scss';

class ResultRow extends React.Component {
  render() {
    const { result } = this.props;
    return (
      <li className="ResultRow">
        <img className="result-image" src={result.image_url} alt='pic'></img>
        {result.name}
        </li>
    );
  }
}

export default ResultRow;
