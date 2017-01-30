import React from 'react';
import {render} from 'react-dom';

class FakeNewsChecker extends React.Component {

  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    console.log( this.checkLinks() );
  }

  checkLinks() {

    let current_url = 'http://fakenewsalerter.dev/wp-json/urlchecker/v1/checklinks/?urls=http://test.com';

    return ( fetch( current_url, {
          type: 'text/jsonp',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        } )
        .then( ( response ) => response.json() )
        .then( ( responseJson ) => {
          return responseJson.data;
        } )

    );

  }

  render () {
    return <div>
      <div>Items:</div>
      { this.state.items.map( item=> { return <div>http://</div> } ) }
    </div>
  }

}

render( <FakeNewsChecker />, document.getElementById( 'app' ) );
