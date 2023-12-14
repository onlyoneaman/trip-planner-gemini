import helpers from "../helpers/index.ts";

const googleapis = {
  generateContent: async (params: any, headers = {}) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    return helpers.api.post({
      data: params, headers,
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`
    })
  },
};

export default googleapis;
