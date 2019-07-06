import React from 'react';

class ResultRow extends React.Component {
  render() {
    const { result } = this.props;
    return (
      <li className="ResultRow">{result.name}</li>
    );
  }
}

export default ResultRow;
