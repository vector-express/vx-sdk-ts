const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/10mmRST.dwg' );

/* convert file from .dwg to .pdf */
vectorExpress.convert( 'dwg', 'pdf', { file } )
.then( ( res ) =>
{
  console.log( res );
  /*
    link to the converted version of the original file :
    https://vector.express/api/v2/public/files/afce43e7-56ce-4e81-8057-4bdf4da4f494.pdf
  */
});
