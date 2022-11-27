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