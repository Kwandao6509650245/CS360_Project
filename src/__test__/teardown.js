// in teardown.js
module.exports = async () => {
    console.log('Tests completed successfully. Exiting now...');
    process.exit(0); // Terminate remaining process and async operation
  };