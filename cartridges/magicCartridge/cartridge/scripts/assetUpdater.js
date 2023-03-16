var logger = require('dw/system/Logger');
var reactServices = require('../services/reactservice.js');
var status  =  require('dw/system/Status');


function execute(args) {
	
    logger.info("File destination Path Prakash : "+destinationPath, "");
    var destinationFile = new File(destinationPath + 'react.min.js');
    var fileWriter = new FileWriter(destinationFile, 'UTF-8');
  
    try {
     } catch (ex) {
        logger.error('[ERROR][File Not found Job] - ' + ex);
    } finally {
        fileWriter.flush();
        fileWriter.close(); 
    } 

    return PIPELET_NEXT;
}

module.exports = {
    execute: execute
};