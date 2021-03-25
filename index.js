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
    if( !url )
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
    if( !url )
    throw new Error( 'Please provide all obligatory args : url, data' );

    if( typeof url !== 'string' )
    throw new Error( 'Please provide url string as a parameter' );
  
    const res = await axios({ url, method : 'post', data });

    return res;
  }

  /* */

  APIWrapper.convert = async function ( inputFormat, outputFormat, options )
  {
    /*
      obligatory :
        inputFormat
        outputFormat

      optional :
        options
        options.file
        options.transformers
        options.params
        options.token
        options.save
        options.path

      either options.file or options.params[ 'use-file' ] must be specified
    */

    if( !inputFormat || !outputFormat )
    throw new Error( 'Please provide all obligatory args : inputFormat, outputFormat' );

    if( !options )
    {
      options = Object.create( null );
      options.transformers = null;
      options.params = null;
      options.token = null;
      options.save = null;
      options.path = null;
      options.file = null;
    }

    if( !options.file && ( !options.params || !options.params[ 'use-file' ] ) )
    throw new Error( 'Please provide a file or specify file on a server through 3d arg : options( options.params[ \'use-file\' ] field )' );

    let url;
    let transformers = options.transformers;

    if( !transformers )
    {

      let paths, res;

      try
      {
        if( options.token )
        {
          paths = await axios
          ({
              url : `${this.meteredPath}/convert/${inputFormat}/auto/${outputFormat}/`,
              method : 'get',
              headers : { Authorization : `Bearer ${options.token}` }
          });
        }
        else
        {
          paths = await axios.get( `${this.publicPath}/convert/${inputFormat}/auto/${outputFormat}/` );
        }
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
    config.data = options.file;

    if( options.token )
    config.headers = { Authorization: `Bearer ${options.token}` };

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

  APIWrapper.analyze = async function ( format, analyzers, options )
  {
    /*
      obligatory :
        format
        analyzers

      optional :
        options
        options.file
        options.params
        options.token

      either options.file or options.params[ 'use-file' ] must be specified
    */
  
    if( !format || !analyzers )
    throw new Error( 'Please provide all mandatory args : format, analyzers' );

    if( Object.prototype.toString.call( analyzers ) === '[object Array]' )
    analyzers = analyzers.join( '/' );
    else if( !( Object.prototype.toString.call( analyzers ) === '[object String]' ) )
    throw new Error( 'Analyzers can either be an array or string' );

    if( !options )
    {
      options = Object.create( null );
      options.params = null;
      options.token = null;
      options.file = null;
    }

    if( !options.file && ( !options.params || !options.params[ 'use-file' ] ) )
    throw new Error( 'Please provide a file or specify file on a server through 3d arg : options( options.params[ \'use-file\' ] field )' );

    /* - config - */

    let config = Object.create( null );

    config.method = 'post';

    if( options.params )
    config.params = options.params;

    if( options.params && options.params[ 'use-file' ] )
    config.data = undefined;
    else
    config.data = options.file;

    if( options.token )
    {
      config.headers = { Authorization: `Bearer ${options.token}` };
      url = `${this.meteredPath}/analyze/${format}/${analyzers}`;
    }
    else
    {
      url = `${this.publicPath}/analyze/${format}/${analyzers}`;
    }

    config.url = url;

    /* - config - */

    let res, analytics;

    try
    {
      res = await axios( config );
      analytics = await axios.get( res.data.resultUrl );
    } catch ( error )
    {
      console.error( error );
      throw new Error( error );
    }

    return analytics.data;
  }

  /* */

  APIWrapper.process = async function ( format, processors, options )
  {
    /*
      obligatory :
        format
        processors

      optional :
        options
        options.file
        options.params
        options.token
        options.save
        options.path

      either options.file or options.params[ 'use-file' ] must be specified
    */

    if( !format || !processors )
    throw new Error( 'Please provide all obligatory args : file, format, processors' );

    if( Object.prototype.toString.call( processors ) === '[object Array]' )
    processors = processors.join( '/' );
    else if( !( Object.prototype.toString.call( processors ) === '[object String]' ) )
    throw new Error( 'Processors can either be an array or string' )

    if( !options )
    {
      options = Object.create( null );
      options.params = null;
      options.token = null;
      options.save = null;
      options.path = null;
      options.file = null;
    }

    if( !options.file && ( !options.params || !options.params[ 'use-file' ] ) )
    throw new Error( 'Please provide a file or specify file on a server through 3d arg : options( options.params[ \'use-file\' ] field )' );

    let res, url;

    /* - config - */

    let config = Object.create( null );

    config.method = 'post';

    if( options.params )
    config.params = options.params;

    if( options.params && options.params[ 'use-file' ] )
    config.data = undefined;
    else
    config.data = options.file;

    if( options.token )
    {
      config.headers = { Authorization: `Bearer ${options.token}` };
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
