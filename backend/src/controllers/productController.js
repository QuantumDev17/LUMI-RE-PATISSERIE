import Product from "../models/Product.js";


export async function getAllProducts (req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        console.error('Error in getAllProducts Controller:', error);
        res.status(500).json({message: 'Internal server error'});
        return;
    }
}

export async function createProduct (req, res) {
   try {
    const {name,description,image, price,category,stock,isAvaliable} = req.body;
    const product = new Product({
        name,
        description,
        image,
        price,
        category,
        stock,
        isAvailable: isAvaliable || true // default to true if not provided
        })
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
   } catch (error) {
     console.error('Error in createProducts Controller:', error);
        res.status(500).json({message: 'Internal server error'});
        return;
   }
}

export async function updateProduct (req, res) {
    res.status(200).send(`Product with ID ${req.params.id} updated`);
}

export async function deleteProduct (req, res) {
    res.status(200).send(`Product with ID ${req.params.id} deleted`);
}

export async function getProductById (req, res) {
    res.status(200).send(`Product with ID ${req.params.id}`);
}
