import axios from 'axios';

export const createProduct = async (formData: FormData) => {
  try {
    const { data } = await axios.post("/api/products", formData);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
