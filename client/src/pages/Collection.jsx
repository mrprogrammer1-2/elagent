import { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import Context from "../context/Context";
import Product from "../components/Product";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useTranslation } from 'react-i18next';

const Collection = ({ productLoading }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const { products, setCategory, setSubCategory, category, subCategory } = useContext(Context);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const selectedCategory = params.get('category');

    useEffect(() => {
        const params = new URLSearchParams();
        if (category.length > 0) {
            params.set('category', category.join(','));
        }
        navigate(`?${params.toString()}`, { replace: true });
    }, [category]);

    useEffect(() => {
        if (selectedCategory) {
            // Clear existing categories and set only the one from URL
            setCategory([selectedCategory]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory && !category.includes(selectedCategory)) {
            setCategory(prev => [...prev, selectedCategory]);
        }
    }, [selectedCategory]);

    const handleCategories = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(cat => cat !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const handleSubCategories = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(cat => cat !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    useEffect(() => {
        let filtered = products?.slice();

        if (category.length > 0) {
            filtered = filtered.filter(product => category.includes(product.category));
        }

        if (subCategory.length > 0) {
            filtered = filtered.filter(product => subCategory.includes(product.subCategory));
        }

        setFilteredProducts(filtered);
    }, [category, subCategory, products]);

    return (
        <>
            {productLoading ? <Spinner /> : (
                <div className="py-20">
                    <Container className={`flex flex-col gap-6 md:gap-8 md:flex-row ${isRTL ? 'rtl' : 'ltr'}`}>
                        <div className="md:w-1/4 w-full bg-gray-200 p-4 h-fit py-8">
                            <h2 className="mb-4.5 text-xl font-edu">{t('collection.filters')}</h2>
                            <div className="font-poppins flex flex-col gap-1.5 text-sm">
                                <h3 className="text-[1rem] mb-2">{t('collection.category')}</h3>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="men">{t('collection.men')}</label>
                                    <input
                                        type="checkbox"
                                        checked={category.includes('Men')}
                                        id="men"
                                        value={'Men'}
                                        className="w-4 h-4"
                                        onChange={handleCategories}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="women">{t('collection.women')}</label>
                                    <input
                                        type="checkbox"
                                        checked={category.includes('Women')}
                                        id="women"
                                        value={'Women'}
                                        className="w-4 h-4"
                                        onChange={handleCategories}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="kids">{t('collection.kids')}</label>
                                    <input
                                        type="checkbox"
                                        checked={category.includes('Kids')}
                                        id="kids"
                                        value={'Kids'}
                                        className="w-4 h-4"
                                        onChange={handleCategories}
                                    />
                                </div>
                            </div>
                            <div className="font-poppins flex flex-col gap-1.5 text-sm mt-7">
                                <h3 className="text-[1rem] mb-2">{t('collection.subcategory')}</h3>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="topwear">{t('collection.topwear')}</label>
                                    <input
                                        type="checkbox"
                                        id="topwear"
                                        value={'Topwear'}
                                        className="w-4 h-4"
                                        onChange={handleSubCategories}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="bottomwear">{t('collection.bottomwear')}</label>
                                    <input
                                        type="checkbox"
                                        id="bottomwear"
                                        value={'Bottomwear'}
                                        className="w-4 h-4"
                                        onChange={handleSubCategories}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="winter">{t('collection.winter')}</label>
                                    <input
                                        type="checkbox"
                                        id="winter"
                                        value={'Winter'}
                                        className="w-4 h-4"
                                        onChange={handleSubCategories}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:w-3/4 w-full">
                            <h1 className="font-edu text-3xl mb-4 font-semibold">{t('collection.title')}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-20 row-auto">
                                {filteredProducts?.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <Product key={index} product={product} />
                                    ))
                                ) : (
                                    <p className="col-span-3 text-center py-10">{t('collection.empty')}</p>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </>
    );
};

export default Collection;