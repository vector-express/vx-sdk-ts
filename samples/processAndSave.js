const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/drawing2.svg' );

/* process svg file */
vectorExpress.process( 'svg', [ 'exclude-groups' ], { save : true, file } )
.then( ( res ) =>
{
  console.log( res );
  /*
    undefined

    'file.svg' is saved in the current working directory
  */
});

