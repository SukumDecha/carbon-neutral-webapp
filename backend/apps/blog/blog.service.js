export const findAll = async (req, res) => {
  const users = [
    {
      name: "John Doe",
      email: "1@gmail.com",
    },
    {
      name: "John Doe",
      email: "1@gmail.com",
    },
  ];
  res.status(200).json(users);
};
