const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/5b58dcdc-df37-4b2e-bf68-bda223485ec5.svg' );

/* analyze svg file */
vectorExpress.process( file, 'svg', [ 'exclude-groups' ] )
.then( ( res ) =>
{
  console.log( res );
  /*
    link to the processed version of the original file :
    https://vector.express/api/v2/public/files/545f7dd0-bc3e-4b61-963d-1064bdba8864.svg
  */
});

