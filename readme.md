This Node app reads a resource text file from `resources/somedata.txt` and posts to server response with content.

To run the Node.js app locally:
```bash
cd testscript1
npm start
```

Pre-requisites:
1. [Functions Core Tools / CLI](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cmacos%2Ccsharp%2Cportal%2Cbash)

To adapt the original code to an Azure Function, starting in the `magicshow` folder:
1. Initialize the mono repo folder as a function using `func init --javascript`
2. Create a function in `testscript1` folder using `func new` -- choose HTTP (or your intended trigger type), and select `y` for overwrite folder
3. in the index.js file, replace the contents of the the async function as follows so it asynchronously calls your code. 

```javascript
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    var data = await readTextData();
    responseMessage = data.toString();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

async function readTextData() {
    const fs = require('fs').promises;
  
    //note: changed relative path to ./resources/* for resources since 
    //func start and npm start run one folder higher
    const data = await fs.readFile('./resources/textdata.txt', 'utf8')
      .catch((err) => console.error('Failed to read file', err));
  
    return data;
  }
```

Notes: ensure calls and promises have `await keyword` to be called async, and also note the relative path of the `resources` folder is now one folder higher, so we changed the path prefix.  

To run as a **local function, in the `magicshow` folder run:

```bash
npm start
```

All this does underneath is a `func start`.  

The Functions CLI will show you a new URL to test the function, e.g. http://localhost:7071/api/testscript1

