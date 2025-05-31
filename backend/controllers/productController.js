import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Add product 
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imageUrls = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            imageUrl: imageUrls,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//List products

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({ success: false, message: error.message });

    }
};

//Remove product

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//Single product info
const productInfo = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product info:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProduct, removeProduct, addProduct, productInfo }