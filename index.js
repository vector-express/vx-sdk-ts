(function vectorExpress() {
  /*
    Basic API :

    https://vector.express/api/v2/public/convert/svg/auto/pdf/ - paths

    https://vector.express/api/v2/public/convert/dxf/cadlib/svg/svgo/svg - convert

    https://vector.express/api/v2/public/convert/svg/librsvg/pdf?use-file=4b89f780-0092-4de6-af11-8fb7f2467a28.svg - convert using existing file

    https://vector.express/api/v2/public/convert/ai/gs/pdf/pdf2svg/svg/svgo/svg?pdf2svg-page=1&svgo-pretty=true - convert with config
  */

  const fs = require( 'fs' );
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
    if( !url || !format )
    throw new Error( 'Please provide all obligatory args : url, format' );

    if( typeof url !== 'string' )
    throw new Error( 'Please provide url string as a parameter' );
  
    const res = await axios.get( url );

    if( format === 'full' )
    return res;

    return res.data;

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
    if( !url || !data )
    throw new Error( 'Please provide all obligatory args : url, data' );

    if( typeof url !== 'string' )
    throw new Error( 'Please provide url string as a parameter' );
  
    const res = await axios({ url, method : 'post', data });

    return res;
  }

  /* */

  APIWrapper.convert = async function ( file, inputFormat, outputFormat, options )
  {
    /*
      obligatory :
        file
        inputFormat
        outputFormat

      optional :
        options
        options.transformers
        options.params
        options.token
        options.save
        options.path
    */

    if( !file || !inputFormat || !outputFormat )
    throw new Error( 'Please provide all obligatory args : file, inputFormat, outputFormat' );

    if( !options )
    {
      options = Object.create( null );
      options.transformers = null;
      options.params = null;
      options.token = null;
      options.save = null;
      options.path = null;
    }

    let url;
    let transformers = options.transformers || null;

    if( !transformers )
    {
      // if( options.token )
      // throw new Error( 'Please specify transformers in the 4th argument to use /metered route' );

      let paths, res;

      try
      {
        paths = await axios.get( `https://vector.express/api/v2/public/convert/${inputFormat}/auto/${outputFormat}/` )
      } catch ( error )
      {
        console.error( error );
        throw new Error( error );
      }
      
      paths = paths.data.alternatives.map( ( el ) => el.path );
      url = `${this.basePath}${paths[ 0 ]}`;

    }
    else
    {
      transformers = transformers.join( '/' );

      url = `${options.token ? this.meteredPath : this.publicPath}/convert/${inputFormat}/${transformers}/${outputFormat}`;
    }

    /* - config - */

    let config = Object.create( null );

    config.url = url;
    config.method = 'post';

    if( options.params )
    config.params = options.params;

    if( options.params && options.params[ 'use-file' ] )
    config.data = undefined;
    else
    config.data = file;

    if( options.token )
    config.headers = { Authorization: `Bearer ${token}` };

    /* - config - */

    try
    {
      res = await axios( config );
    } catch ( error )
    {
      console.error( error );
      throw new Error( error );
    }

    if( options.save )
    {
      let path = options.path || `${__dirname}/file.${res.data.format}`;
      return this.downloadAndSave( res.data.resultUrl, path );
    }
    else
    {
      return res.data.resultUrl;
    }
  }

  /* */

  APIWrapper.analyze = async function ( file, format, analyzers )
  {
    if( !file || !format || !analyzers )
    throw new Error( 'Please provide all mandatory args : file, format, analyzers' );

    analyzers = analyzers.join( '/' );
    let url = `${this.publicPath}/analyze/${format}/${analyzers}`;

    let res, analytics;

    try
    {
      res = await axios({ url, method : 'post', data : file })
      analytics = await axios.get( res.data.resultUrl );
    } catch ( error )
    {
      console.error( error );
      throw new Error( error );
    }

    return analytics.data;
  }

  /* */

  APIWrapper.process = async function ( file, format, processors, options )
  {
    /*
      obligatory :
        file
        format
        processors

      optional :
        options
        options.params
        options.token
        options.save
        options.path
    */

    if( !file || !format || !processors )
    throw new Error( 'Please provide all obligatory args : file, format, processors' );

    if( !options )
    {
      options = Object.create( null );
      options.params = null;
      options.token = null;
      options.save = null;
      options.path = null;
    }

    processors = processors.join( '/' );

    let res, url;

    /* - config - */

    let config = Object.create( null );

    config.method = 'post';

    if( options.params )
    config.params = options.params;

    if( options.params && options.params[ 'use-file' ] )
    config.data = undefined;
    else
    config.data = file;

    if( options.token )
    {
      config.headers = { Authorization: `Bearer ${token}` };
      url = `${this.meteredPath}/process/${format}/${processors}`;
    }
    else
    {
      url = `${this.publicPath}/process/${format}/${processors}`;
    }

    config.url = url;

    /* - config - */

    try
    {
      res = await axios( config )
    } catch ( error )
    {
      console.error( error );
      throw new Error( error );
    }

    if( options.save )
    {
      let path = options.path || `${__dirname}/file.${res.data.format}`;
      return this.downloadAndSave( res.data.resultUrl, path );
    }
    else
    {
      return res.data.resultUrl;
    }
  }

  /* */

  APIWrapper.downloadAndSave = async ( url, path ) =>
  {
    if( !url )
    throw new Error( 'Please provide all obligatory args : url' );

    if( !path )
    path = __dirname + '/file';

    let response = await axios({ url, method : 'get', responseType : 'stream' });
    response.data.pipe( fs.createWriteStream( path ) );

    return new Promise( ( resolve, reject ) =>
    {
      response.data.on( 'end', () => { resolve() });
      response.data.on( 'error', ( err ) => { reject( err ) });
    })
  }

  module.exports = APIWrapper;
  
})();
