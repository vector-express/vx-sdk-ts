const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/drawing3.dwg' );

/*
  convert file from .dwg to .svg
  analogue for https://vector.express/api/v2/public/convert/dwg/cadlib/svg?cadlib-epsilon=2
*/

vectorExpress.convert( 'dwg', 'svg', { file, converters : [ 'cadlib' ], params : { 'cadlib-epsilon' : 2 } } )
.then( ( res ) =>
{
  console.log( res );
  /*
    link to the converted version of the original file :
    https://vector.express/api/v2/public/files/16acf8e7-2447-457b-a310-6781ac54ff46.svg
  */
});
