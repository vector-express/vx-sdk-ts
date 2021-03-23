(function vectorExpress() {
  /*
    Basic API :

    https://vector.express/api/v2/public/convert/svg/auto/pdf/ - paths

    https://vector.express/api/v2/public/convert/dxf/cadlib/svg/svgo/svg - convert

    https://vector.express/api/v2/public/convert/svg/librsvg/pdf?use-file=4b89f780-0092-4de6-af11-8fb7f2467a28.svg - convert using existing file

    https://vector.express/api/v2/public/convert/ai/gs/pdf/pdf2svg/svg/svgo/svg?pdf2svg-page=1&svgo-pretty=true - convert with config
  */

  const axios = require( 'axios' );
  const APIWrapper = Object.create( null );

  APIWrapper.basePath = 'https://vector.express';
  APIWrapper.publicPath = 'https://vector.express/api/v2/public';
  APIWrapper.meteredPath = 'https://vector.express/api/v2/metered';

  /**
   * Sends request to a url, returns Promise.
   *
   * @param {String} url
   * @return {Promise} - contains info about request, response
   */
  
  APIWrapper.get = async function ( url, format )
  {
    if( typeof url !== 'string' )
    throw new Error( 'Please provide url string as a parameter' );
  
    const res = await axios.get( url )
    .then( ( res ) =>
    {
      if( format === 'full' )
      return res;

      return res.data;
    })
    .catch( err =>
    {
      console.error( err );
    });

    return res;
  }

  /* */

  /**
   * Sends data to the url, returns Promise.
   *
   * @param {String} url
   * @return {Promise} - contains info about request, response
   */

  APIWrapper.post = async function ( url, data )
  {
    if( typeof url !== 'string' )
    throw new Error( 'Please provide url string as a parameter' );
  
    const res = await axios({ url, method : 'post', data })
    .then( ( response ) =>
    {
      return response;
    })
    .catch( err =>
    {
      console.error( err );
    });

    return res;
  }

  /* */

  APIWrapper.convert = async function ( file, inputFormat, outputFormat, transformers )
  {
    let url = '';

    if( !transformers )
    {
      let paths;
      try {
        paths = await axios.get( `https://vector.express/api/v2/public/convert/${inputFormat}/auto/${outputFormat}/` )
      } catch ( error ) {
        throw new Error( error.message );
      }
      
      paths = paths.data.alternatives.map( ( el ) => el.path );
      url = `${this.basePath}${paths[ 0 ]}`;

    }
    else
    {
      transformers = transformers.join( '/' );
      url = `${this.publicPath}/convert/${inputFormat}/${transformers}/${outputFormat}`;
    }

    const res = await axios({ url, method : 'post', data : file })
    .then( ( response ) =>
    {
      return response.data;
    })
    .catch( err =>
    {
      console.error( err );
    });

    return res;
  }

  /* */

  module.exports = APIWrapper;
  
})();
