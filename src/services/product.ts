export const createProduct = async (formData: FormData) => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData, 
      });
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  