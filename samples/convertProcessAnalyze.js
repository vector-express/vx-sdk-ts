const fs = require( 'fs' );
const vectorExpress = require( '../index' );

const file = fs.readFileSync( __dirname + '/files/10mmRST.dwg' );

( async function ()
{
  /* send file to the server */
  let convertedPdfUrl = await vectorExpress.convert( 'dwg', 'pdf', { file } );
  let filename0 = convertedPdfUrl.split( '/' ).pop();
  console.log( 'filename0 : ', filename0 );
  // filename0 :  0a5096c3-cf98-4f7e-8ad1-5237c2fea5b5.pdf

  /* convert existing file */
  let convertedSvgUrl = await vectorExpress.convert( 'pdf', 'svg', { params : { 'use-file' : filename0 } } );
  let filename1 = convertedSvgUrl.split( '/' ).pop();
  console.log( 'filename1 : ', filename1 );
  // filename1 :  9f513077-8ead-4f78-87aa-cc1d427165c4.svg

  /* process existing converted file */
  let processedUrl = await vectorExpress.process( 'svg', [ 'exclude-groups' ], { params : { 'use-file' : filename1 } } );
  let filename2 = processedUrl.split( '/' ).pop();
  console.log( 'filename2 : ', filename2 );
  // filename2 :  ac487ed0-f594-42e8-a893-dae7e417cced.svg

  /* analyze existing processed file */
  let analyzedData = await vectorExpress.analyze( 'svg', [ 'groups' ], { params : { 'use-file' : filename2 } } );
  console.log( analyzedData );
  // [ 'surface1' ]
})()
