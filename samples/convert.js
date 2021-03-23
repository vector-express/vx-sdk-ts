const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/10mmRST.dwg' );

vectorExpress.convert( file, 'dwg', 'pdf' )
.then( ( res ) =>
{
  console.log( res );
  /*
    {
      id: '056b1ab0-9ffa-4b8f-8545-303d9cf5a52d',
      inputUrl:
      'https://vector.express/api/v2/public/files/397fb336-f86c-470c-9a38-3db66c46a691.dwg',
      resultUrl:
      'https://vector.express/api/v2/public/files/af57acb6-f916-4feb-aad8-d65f357f00cc.pdf',
      time: 4274,
      format: 'pdf',
      tasks:
      [
        { resultUrl:
            'https://vector.express/api/v2/public/files/f199e5c1-ed11-4d75-a485-22756506c4f2.svg',
          format: 'svg',
          time: 2877 },
        { resultUrl:
            'https://vector.express/api/v2/public/files/af57acb6-f916-4feb-aad8-d65f357f00cc.pdf',
          format: 'pdf',
          time: 1236 }
      ]
    }
  */
});
