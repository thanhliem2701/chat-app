const generateTextMessage = (from, text) => {
  return {
    from,
    text,
    createAt: Date.now()
  };
};

module.exports = {generateTextMessage}