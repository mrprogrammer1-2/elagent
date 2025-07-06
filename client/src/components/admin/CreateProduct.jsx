import { useState } from 'react'
import api from '../../api/axios'
import Spinner from '../Spinner'

const categories = ['men', 'women', 'kids']
const subCategories = ['topwear', 'bottomwear', 'winter']

const CreateProduct = () => {

    const [loading, setLoading] = useState(false)
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        subCategory: '',
        description: '',
        image: [],
        bestseller: false,
        sizes: []
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData()
        formData.append('name', newProduct.name)
        formData.append('price', newProduct.price)
        formData.append('category', newProduct.category)
        formData.append('subCategory', newProduct.subCategory)
        formData.append('description', newProduct.description)

        formData.append('bestseller', newProduct.bestseller)
        formData.append('sizes', JSON.stringify(newProduct.sizes))

        newProduct.image.forEach((file) => {
            formData.append('image', file)
        })
        try {
            const response = await api.post('/products', formData)
            console.log('Success:', response.data)

            // Reset form
            setNewProduct({
                name: '',
                price: '',
                category: '',
                subCategory: '',
                description: '',
                bestseller: false,
                image: [],
                sizes: []
            })
            setLoading(false)
        } catch (error) {
            console.error('Full error:', error)
            console.error('Error response:', error.response?.data)
            alert(`Error: ${error.response?.data?.message || 'Failed to create product'}`)
            setLoading(false)
        }

    }

    const handleSizesChange = (size) => {
        if (newProduct.sizes.includes(size)) {
            setNewProduct({
                ...newProduct,
                sizes: newProduct.sizes.filter((s) => s !== size)
            })
        } else {
            setNewProduct({
                ...newProduct,
                sizes: [...newProduct.sizes, size]
            })
        }

    }

    return (

        <div className='min-h-screen h-full relative flex flex-col gap-3'>
            <h1 className='text-3xl text-center font-edu mt-3'>Add new product</h1>
            <form onSubmit={handleSubmit} className='bg-gray-600 p-4 mt-5 rounded w-[500px] max-w-[95vw] space-y-2.5'>
                <>
                    {
                        loading &&
                        <div className=' absolute inset-0'>
                            <Spinner />
                        </div>
                    }
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Product name:</label>
                        <input
                            type="text"
                            id="name"
                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="description">Product description:</label>
                        <textarea
                            type="text"
                            id="description"
                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="price">Product price:</label>
                        <input
                            type="number"
                            id="price"
                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            id="category"
                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                            <option value=''>
                                Select category
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="subCategory">SubCategory</label>
                        <select
                            name="subCategory"
                            id="subCategory"
                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            value={newProduct.subCategory}
                            onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                        >
                            <option value=''>
                                Select subCategory
                            </option>
                            {subCategories.map((subCategory) => (
                                <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="image">Product images:</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            multiple
                            accept="image/*"
                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer transition-all hover:bg-emerald-500'
                            onChange={(e) => setNewProduct({ ...newProduct, image: Array.from(e.target.files) })}
                        />
                    </div>
                    <div>
                        <p>Product's sizes</p>
                        <div className='flex gap-2 items-center'>
                            <div onClick={() => handleSizesChange('s')} className={`inline-flex border text-white justify-center items-center w-11 h-8 rounded-sm cursor-pointer ${newProduct.sizes.includes('s') ? 'border-emerald-500 text-emerald-500' : 'border-gray-400'}`}>S</div>
                            <div onClick={() => handleSizesChange('m')} className={`inline-flex border text-white justify-center items-center w-11 h-8 rounded-sm cursor-pointer ${newProduct.sizes.includes('m') ? 'border-emerald-500 text-emerald-500' : 'border-gray-400'}`}>M</div>
                            <div onClick={() => handleSizesChange('l')} className={`inline-flex border text-white justify-center items-center w-11 h-8 rounded-sm cursor-pointer ${newProduct.sizes.includes('l') ? 'border-emerald-500 text-emerald-500' : 'border-gray-400'}`}>L</div>
                            <div onClick={() => handleSizesChange('xl')} className={`inline-flex border text-white justify-center items-center w-11 h-8 rounded-sm cursor-pointer ${newProduct.sizes.includes('xl') ? 'border-emerald-500 text-emerald-500' : 'border-gray-400'}`}>XL</div>
                            <div onClick={() => handleSizesChange('xxl')} className={`inline-flex border text-white justify-center items-center w-11 h-8 rounded-sm cursor-pointer ${newProduct.sizes.includes('xxl') ? 'border-emerald-500 text-emerald-500' : 'border-gray-400'}`}>XXL</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" checked={newProduct.bestseller} name="bestseller" id="bestseller" onChange={(e) => setNewProduct({ ...newProduct, bestseller: e.target.checked })} />
                        <label htmlFor="bestseller">Bestseller</label>
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded transition-colors'
                    >
                        Add Product
                    </button>
                </>

            </form>
        </div>
    )
}

export default CreateProduct