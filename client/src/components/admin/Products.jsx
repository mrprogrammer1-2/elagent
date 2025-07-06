import { Trash, Star, Edit } from "lucide-react";
import { useContext } from "react";
import Context from "../../context/Context";
import api from "../../api/axios"


const Products = () => {

    const { products, setProducts } = useContext(Context)

    const handleToggleBestseller = async (id) => {

        setProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === id
                    ? { ...product, bestseller: !product.bestseller }
                    : product
            )
        );

        try {
            const response = await api.patch(`/products/bestsellerTog/${id}`);
            console.log(response)
        } catch (err) {
            console.error('Failed to update bestseller status:', err);

            // 3. Revert if the API call fails
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === id
                        ? { ...product, bestseller: !product.bestseller } // Toggle back
                        : product
                )
            );

            // Optional: Show error notification to user
            alert('Failed to update bestseller status. Please try again.');
        }

    }

    const handleDelete = async (id) => {
        try {
            setProducts(prevProducts =>
                prevProducts.filter(product => product._id !== id)
            );
            const response = await api.delete(`/products/${id}`);
            console.log(response)

        } catch (err) {
            console.error('Failed to delete product:', err);
            alert('Failed to delete product. Please try again.');
        }
    }

    return (
        <div className="bg-gray-800 rounded-md max-w-4xl max-auto">
            <table className='min-w-full divide-y divide-gray-600'>
                <thead className='bg-gray-700'>
                    <tr>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Product
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Price
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Category
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Bestseller
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Action
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Edit
                        </th>
                    </tr>
                </thead>

                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                    {products?.map((product) => (
                        <tr key={product._id}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 h-10 w-10'>
                                        <img
                                            className='h-10 w-10 rounded-full object-cover'
                                            src={product.images[0].url}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <div className='text-sm font-medium text-white'>{product.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-300'>{product.category}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button
                                    onClick={() => handleToggleBestseller(product._id)}
                                    className={`p-1 rounded-full ${product.bestseller ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
                                        } hover:bg-yellow-500 transition-colors duration-200`}
                                >
                                    <Star className='h-5 w-5' />
                                </button>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className='text-red-400 hover:text-red-300'
                                >
                                    <Trash className='h-5 w-5' />
                                </button>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <button

                                    className='text-blue-400 hover:text-blue-300'
                                >
                                    <Edit className='h-5 w-5' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Products