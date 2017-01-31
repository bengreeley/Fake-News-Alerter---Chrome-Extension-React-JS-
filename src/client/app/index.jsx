import React from 'react';
import {render} from 'react-dom';

class FakeNewsChecker extends React.Component {

    constructor() {
        super();
        this.state = {
            foundURLs: []
        };
    }

    componentDidMount() {
        this.checkLinks();
    }

    checkLinks() {

        let urls = [];

        // Add the current page to the URLs array
        urls.push( window.location.href );

        //TODO: Add rest of URLs on page

        let current_url = 'http://fakenewsalerter.dev/wp-json/urlchecker/v1/checklinks/?urls=${urls}';

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

                // Set the state with the data
                return this.setState({
                    foundURLs: responseJson.data
                } );
            } ) );

    }

    render () {

        let foundURLCount = 0;

        if( this.state.foundURLs ) {
            foundURLCount = this.state.foundURLs.length;
        }

        this.updateFoundCount( foundURLCount );

        if( foundURLCount > 0 ) {

            return (
                <div>
                    <div>Items:</div>
                    <ul>
                        {this.state.foundURLs.map(function (foundLink) {
                            return (
                                <li>{foundLink}</li>
                            )
                        })

                        }</ul>
                </div>
            );

        }

        return <div></div>;
    }

    updateFoundCount( updateCount ) {

        var updateValue = 'No';

        if( parseInt( updateCount ) > 0 ) {
            updateValue = parseInt( updateCount );
        }

        document.getElementById('fake-news-count').textContent = updateValue;

    }

}

render( <FakeNewsChecker />, document.getElementById( 'app' ) );
