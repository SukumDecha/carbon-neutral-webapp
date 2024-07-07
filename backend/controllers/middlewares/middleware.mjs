export const isAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }

  return response.redirect("/login");
};
