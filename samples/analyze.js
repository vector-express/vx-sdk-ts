const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/5b58dcdc-df37-4b2e-bf68-bda223485ec5.svg' );

/* analyze svg file */
vectorExpress.analyze( file, 'svg', [ 'groups' ] )
.then( ( res ) =>
{
  console.log( res );
  /*
    [ 
      '0',
      'AM_BOR_FI',
      'AM_BOR_EN',
      'AM_BOR_SE',
      'AM_BOR_DE',
      'AM_BOR_PM',
      'AM_BOR_PP',
      'AM_BOR_JP',
      'AM_BOR_VH',
      'AM_BOR',
      'Defpoints',
      'AM_0',
      'AM_5',
      'AM_12',
      'AM_PAREF',
      'AM_3' 
    ]
  */
});

