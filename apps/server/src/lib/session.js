// Rotate session identifiers on authentication without logging the user out of
// previously unlocked clients or the admin area.
export async function authenticate(req, update) {
  const clients = { ...req.session.clients };
  const isAdmin = req.session.isAdmin === true;
  await new Promise((resolve, reject) => req.session.regenerate((error) => error ? reject(error) : resolve()));
  req.session.clients = clients;
  req.session.isAdmin = isAdmin;
  update(req.session);
  await saveSession(req);
}

export function saveSession(req) {
  return new Promise((resolve, reject) => req.session.save((error) => error ? reject(error) : resolve()));
}
