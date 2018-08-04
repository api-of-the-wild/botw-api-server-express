const rp = require("request-promise");
const url = "http://checkip.amazonaws.com/";
let response;

const hello = async (event, context, callback) => {
  try {
    const ret = await rp(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
        location: ret,
      }),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    callback(err, null);
  }

  callback(null, response);
};

module.exports = {
  hello,
};
