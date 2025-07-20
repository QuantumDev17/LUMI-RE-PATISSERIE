export function getAllOrders(req, res) {
    res.status(200).send('List of orders');
};

export function createOrder(req, res) {
    res.status(201).send('Order created');
};

export function updateOrder(req, res) {
    res.status(200).send(`Order with ID ${req.params.id} updated`);
};

export function deleteOrder(req, res) {
    res.status(200).send(`Order with ID ${req.params.id} deleted`);
};

export function getOrderById(req, res) {
    res.status(200).send(`Order with ID ${req.params.id}`);
};