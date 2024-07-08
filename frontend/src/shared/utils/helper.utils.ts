export const getImagePath = (image: string) => {
  return `http://localhost:3000/api/uploads/${image}`;
};

export const generateRandomNumber = () => {
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 1e9);
  return `${timestamp}-${randomComponent}`;
};

export const formatDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);

  return `${day}-${month}-${year}`;
};
