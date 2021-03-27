# vector-express

A NodeJS wrapper for [Vector Express](https://github.com/smidyo/vectorexpress-api), an API that allows you to convert, analyze and process vector files. Works for both public endpoints and paid metered endpoints by supplying your Bearer token.

## Installation

`npm install @smidyo/vectorexpress-nodejs`


## Interface

* **`get`** - makes a GET request to a certain url.
  * parameters :
    * url - url to be requested
    * format (optional) - if 'full', returns all info about communication with a server.

* **`post`** - makes a POST request to a certain url.
  * parameters :
    * url - url to be requested
    * data (optional) - data to be sent a server.

* **`convert`** - convert a file from one format to another.
  * parameters :
    * obligatory :
        * inputFormat
        * outputFormat
    * optional :
        * options - options map.
        * options.file - file to be sent for conversion.
        * options.transformers - transformers to be used for conversion
        * options.params - parameters of request ( options for conversion, use-file to use it from a server )
        * options.token - Bearer token to be sent for authentication.
        * options.save - if true, file is saved to options.path, ortherwise url of the file location is returned.
        * options.path - path where to save converted file.

  **Either `options.file` or `options.params[ 'use-file' ]` must be specified**

* **`process`** - process a file.
  * parameters :
    * obligatory :
        * format
        * processors - to be used for conversion
    * optional :
        * options - options map.
        * options.file - file to be sent for conversion.
        * options.params - parameters of request ( options for processors, use-file to use it from a server )
        * options.token - Bearer token to be sent for authentication.
        * options.save - if true, file is saved to options.path, ortherwise url of the file location is returned.
        * options.path - path where to save converted file.

  **Either `options.file` or `options.params[ 'use-file' ]` must be specified**

* **`analyze`** - analyze a file.
  * parameters :
    * obligatory :
        * format
        * analyzers - to be used for conversion
    * optional :
        * options - options map.
        * options.file - file to be sent for conversion.
        * options.params - parameters of request ( options for analyzers, use-file to use it from a server )
        * options.token - Bearer token to be sent for authentication.

  **Either `options.file` or `options.params[ 'use-file' ]` must be specified**


### [Samples](./samples)