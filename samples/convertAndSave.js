const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/10mmRST.dwg' );

/* convert file from .dwg to .pdf */
vectorExpress.convert( file, 'dwg', 'pdf', { save : true } )
.then( ( res ) =>
{
  console.log( res );
  /*
    undefined

    'file.pdf' is saved in the current working directory
  */
});
