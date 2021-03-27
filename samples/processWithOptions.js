const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/drawing2.svg' );

/*
  process svg file
  analogue for https://vector.express/api/v2/public/process/svg/include-only-groups/?include-only-groups-groups=DEFPOINTS  
*/
vectorExpress.process( 'svg', [ 'include-only-groups' ], { file, params : { 'include-only-groups-groups' : 'DEFPOINTS' } } )
.then( ( res ) =>
{
  console.log( res );
  /*
    link to the processed version of the original file :
    https://vector.express/api/v2/public/files/78e51754-d88a-4fab-a6cb-fcb86496a523.svg
  */
});
