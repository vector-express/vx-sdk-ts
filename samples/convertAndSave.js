const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/drawing3.dwg' );

/* convert file from .dwg to .pdf */
vectorExpress.convert( 'dwg', 'pdf', { file, save : true, path : __dirname + '/mysuperfolder/mysuperfile.pdf' } )
.then( ( res ) =>
{
  console.log( res );
  /*
    undefined

    'file.pdf' is saved in the current working directory
  */
});
