export function getAllProducts (req, res) {
    res.status(200).send('List of products');
};

export function createProduct (req, res) {
    res.status(201).send('Product created');
};

export function updateProduct (req, res) {
    res.status(200).send(`Product with ID ${req.params.id} updated`);
};

export function deleteProduct (req, res) {
    res.status(200).send(`Product with ID ${req.params.id} deleted`);
};
