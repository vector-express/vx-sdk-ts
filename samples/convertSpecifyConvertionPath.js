const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/drawing1.svg' );

/* convert file from .svg to .pdf using these converters : 'librsvg', 'eps', 'gs' */
vectorExpress.convert( 'svg', 'pdf', { file, transformers : [ 'librsvg', 'eps', 'gs' ] } )
.then( ( res ) =>
{
  console.log( res );
  /*
    link to the converted version of the original file :
    https://vector.express/api/v2/public/files/0f7f9a9e-bf4a-4201-8898-c4cb7941e13d.pdf
  */
});