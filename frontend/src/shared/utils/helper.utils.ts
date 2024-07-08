export const getImagePath = (image: string) => {
  return `http://localhost:3000/api/uploads/${image}`;
};

export const generateRandomNumber = () => {
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 1e9);
  return `${timestamp}-${randomComponent}`;
};
