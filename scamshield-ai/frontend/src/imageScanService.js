export const scanImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("http://127.0.0.1:8000/scan-image", {
      method: "POST",
      body: formData
    });
  
    const data = await response.json();
    return data;
  };