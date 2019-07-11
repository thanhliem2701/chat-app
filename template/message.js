const generateTextMessage = (from, text) => {
  return {
    from,
    text,
    createAt: Date.now()
  };
};

const generateLocation = (from, latitude, longtitude) => {
  return {
    from,
    latitude,
    longtitude
  };
};

module.exports = { generateTextMessage,generateLocation };
