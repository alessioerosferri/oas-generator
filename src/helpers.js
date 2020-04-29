const _ = require("lodash");

const getExamples = (responses, schemas) => {
  let responsesToReturn = [];
  _.forOwn(responses, (responseObj, status) => {
    const {content} = responseObj;
    _.forOwn(content, ({schema}, contentType) => {
      const {example, $ref} = schema;
      let error = true;
      if ($ref) {
        error = false;
        const splittedSchema = $ref.split("/");
        const schemaName = $ref.split("/")[splittedSchema.length - 1];
        responsesToReturn.push({status, example: schemas[schemaName]["example"]});
      } else if (example) {
        error = false;
        responsesToReturn.push({status, example});
      }
      if (error) {
        console.error("You need to provide response examples.");
        process.exit(1);
      }
    });
  });
  return responsesToReturn;
};

module.exports = {getExamples};