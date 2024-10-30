const createRequest = async (options = {}) => {
  return await fetch("http://localhost:3000/news", options);
};

export default createRequest;
