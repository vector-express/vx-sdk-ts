const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/0e729b7d-2473-4ff2-8b8e-d1dd64ea6ce2.svg' );

/* post data */
vectorExpress.post( 'https://vector.express/api/v2/public/convert/svg/librsvg/eps/gs/pdf/', file )
.then( ( res ) =>
{
  console.log( res.data );

  /*
    {
      id: '1070962b-4670-4268-9abb-8f9841debb2e',
      inputUrl:
      'https://vector.express/api/v2/public/files/dfcdf36e-bff5-48f3-a877-27851f7e9999.svg',
      resultUrl:
      'https://vector.express/api/v2/public/files/36460eba-4c6c-4cc5-af0a-ff7d8307d305.pdf',
      time: 669,
      format: 'pdf',
      tasks:
      [ { resultUrl:
            'https://vector.express/api/v2/public/files/db45816a-24d8-4b90-b2af-8c7aef55b0fc.eps',
          format: 'eps',
          time: 133 },
        { resultUrl:
            'https://vector.express/api/v2/public/files/36460eba-4c6c-4cc5-af0a-ff7d8307d305.pdf',
          format: 'pdf',
          time: 110 }
      ] 
    }
  */
});
