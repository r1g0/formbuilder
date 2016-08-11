import React, { Component } from 'react';

class GPSWidget extends Component {
  render() {
    const {validation} = this.props.schema;
    console.log("GPSWidget render ", this.props);
    const areas = validation.areas && validation.areas.length>0 ?
          <div> Areas
          <ul>{validation.areas.map(
              area => <li>{area.northeast} => {area.southwest}</li>
            )} </ul> </div> : null;
    return (
      <div>
        Max error: {validation.max_error}
        {areas}
      </div>
    );
  }
}

export default GPSWidget;