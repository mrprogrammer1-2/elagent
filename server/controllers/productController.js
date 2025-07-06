const Product = require('../models/productModel')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()

        if (!products?.length) return res.status(400).json({ message: 'No Products found' })

        res.status(201).json({ products })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })

    }
}


const createProduct = async (req, res) => {
    let uploadResults = [];
    console.log('Request files:', req.files); // Debug log

    try {
        const { name, price, category, subCategory, bestseller, description, sizes } = req.body;
        const imageFiles = req.files;

        // Validate required fields
        if (!name || !price || !category || !subCategory || !sizes) {
            return res.status(400).json({ message: 'Name, price, category, and subCategory are required' });
        }

        // Enhanced validation
        if (!imageFiles || imageFiles.length === 0) {
            console.log('No files received in request');
            return res.status(400).json({ message: 'At least one image is required' });
        }

        // Upload images with better error handling
        for (const file of imageFiles) {
            console.log(`Processing file: ${file.originalname}, path: ${file.path}`);

            try {
                // Verify file exists locally
                if (!file.path || !fs.existsSync(file.path)) {
                    console.error('File missing at path:', file.path);
                    continue;
                }

                console.log('Starting Cloudinary upload...');
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'ecommerce-products',
                    resource_type: 'auto',
                });

                console.log('Cloudinary upload success:', result.secure_url);
                uploadResults.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });

                // Clean up local file
                fs.unlinkSync(file.path);
                console.log('Local file cleaned up');
            } catch (uploadError) {
                console.error('Detailed upload error:', {
                    message: uploadError.message,
                    stack: uploadError.stack,
                    file: file.originalname
                });
                if (file.path && fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
                continue;
            }
        }

        if (uploadResults.length === 0) {
            return res.status(400).json({
                message: 'All image uploads failed'
            });
        }

        // Create product with proper image field
        const product = await Product.create({
            name,
            price: parseFloat(price),
            description,
            category,
            subCategory,
            bestseller,
            sizes: sizes ? JSON.parse(sizes) : [],
            images: uploadResults, // Matches the product model schema
        });

        console.log('Product created:', product);

        return res.status(201).json({
            success: true,
            product
        });

    } catch (error) {
        console.error('Final catch error:', error);

        // Enhanced cleanup
        await cleanupUploads(uploadResults, req.files);

        return res.status(500).json({
            success: false,
            message: error.message || 'Product creation failed'
        });
    }
};

// Helper function for cleanup
async function cleanupUploads(uploadResults, files) {
    // Clean Cloudinary
    if (uploadResults?.length > 0) {
        await Promise.all(uploadResults.map(result =>
            cloudinary.uploader.destroy(result.public_id).catch(e => console.error(e))
        ))
    }

    // Clean local files
    if (files?.length > 0) {
        files.forEach(file => {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, category, subCategory, bestseller, description, sizes } = req.body

        if (!id) return res.status(400).json({ message: 'Product id is required' })

        const product = await Product.findById(id)

        if (!product) return res.status(400).json({ message: 'Product not found' })

        product.name = name || product.name
        product.price = price || product.price
        product.category = category || product.category
        product.subCategory = subCategory || product.subCategory
        product.bestseller = bestseller || product.bestseller
        product.description = description || product.description
        product.sizes = sizes ? JSON.parse(sizes) : product.sizes

        await product.save()

        const products = await Product.find()

        return res.status(201).json({
            success: true,
            products
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

const toggleBestseller = async (req, res) => {

    try {
        const { id } = req.params

        if (!id) return res.status(400).json({ message: 'Product id is required' })

        const product = await Product.findById(id)

        if (!product) return res.status(400).json({ message: 'Product not found' })

        product.bestseller = !product.bestseller

        await product.save()

        return res.status(201).json({
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }

}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Get product to access image public_ids
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete images from Cloudinary
        if (product.images && product.images.length > 0) {
            await Promise.all(
                product.images.map(image =>
                    cloudinary.uploader.destroy(image.public_id)
                )
            );
        }

        // Delete product from database
        await Product.findByIdAndDelete(id);

        res.json({ message: 'Product and images deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    toggleBestseller,
    deleteProduct
}