const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/drawing2.svg' );

/* process svg file */
vectorExpress.process( 'svg', [ 'exclude-groups' ], { file } )
.then( ( res ) =>
{
  console.log( res );
  /*
    link to the processed version of the original file :
    https://vector.express/api/v2/public/files/545f7dd0-bc3e-4b61-963d-1064bdba8864.svg
  */
});

