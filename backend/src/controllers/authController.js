export function getAllUsers(req, res) {
    res.status(200).send('List of users');
};

export function createUser(req, res) {
    res.status(201).send('User created');
};

export function updateUser(req, res) {
    res.status(200).send(`User with ID ${req.params.id} updated`);
};

export function deleteUser(req, res) {
    res.status(200).send(`User with ID ${req.params.id} deleted`);
};

export function getUserById(req, res) {
    res.status(200).send(`User with ID ${req.params.id}`);
};