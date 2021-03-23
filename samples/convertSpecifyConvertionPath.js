const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/0e729b7d-2473-4ff2-8b8e-d1dd64ea6ce2.svg' );

vectorExpress.convert( file, 'svg', 'pdf', [ 'librsvg', 'eps', 'gs' ] )
.then( ( res ) =>
{
  console.log( res );
  /*
    {
      id: '12c49a5b-d5af-46b4-983e-75895930f4dd',
      inputUrl:
      'https://vector.express/api/v2/public/files/8f4c00dc-9df6-4a54-88a7-4ba9b173baaf.svg',
      resultUrl:
      'https://vector.express/api/v2/public/files/b97efa3f-cd9f-40dc-94d5-e68d1ddeb87e.pdf',
      time: 374,
      format: 'pdf',
      tasks:
      [
        { resultUrl:
            'https://vector.express/api/v2/public/files/67798244-9575-4981-8a85-edcaf9d8d327.eps',
          format: 'eps',
          time: 133 },
        { resultUrl:
            'https://vector.express/api/v2/public/files/b97efa3f-cd9f-40dc-94d5-e68d1ddeb87e.pdf',
          format: 'pdf',
          time: 110 }
      ]
    }
  */
});