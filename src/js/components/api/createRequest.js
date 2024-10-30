const createRequest = async (options = {}) => {
  return await fetch("https://buggy-service-backend.vercel.app/news", options);
};

export default createRequest;
