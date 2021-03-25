const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/5b58dcdc-df37-4b2e-bf68-bda223485ec5.svg' );

/* analyze svg file */
vectorExpress.process( 'svg', [ 'exclude-groups' ], { save : true, file } )
.then( ( res ) =>
{
  console.log( res );
  /*
    undefined

    'file.svg' is saved in the current working directory
  */
});

