import { useTranslation } from 'react-i18next';
import Container from '../Container';
import womens from "../../assets/womens.jpg";
import mens from "../../assets/mens.jpg";
import { useNavigate } from 'react-router-dom';

const Discover = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isRTL = i18n.language === 'ar';

    const handleMenClick = () => navigate('/collection?category=Men');
    const handleWomenClick = () => navigate('/collection?category=Women');

    return (
        <Container className={`flex flex-col md:flex-row gap-3 items-center justify-between md:h-[80vh] py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Women's Section */}
            <div className='w-full md:w-1/2 h-full group relative overflow-hidden cursor-pointer' onClick={handleWomenClick}>
                <img src={womens} loading='lazy' alt={t('discover.womensTitle')} className='object-cover w-full h-full transition-all duration-300 group-hover:scale-[1.1]' />
                <div className={`absolute top-0 w-full h-full gap-4 flex flex-col p-8 pt-10 text-white z-10 ${isRTL ? 'items-start' : 'items-end'}`}>
                    <p className='uppercase font-bold text-xl'>{t('discover.completeLook')}</p>
                    <p className='capitalize text-4xl font-bold'>{t('discover.womensTitle')}</p>
                    <p className={`text-xl text-gray-200 tracking-wide font-poppins ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('discover.womensSubtitle')}
                    </p>
                </div>
            </div>

            {/* Men's Section */}
            <div className='w-full md:w-1/2 h-full group relative overflow-hidden cursor-pointer' onClick={handleMenClick}>
                <img src={mens} loading='lazy' alt={t('discover.mensTitle')} className='object-cover w-full h-full transition-all duration-300 group-hover:scale-[1.1]' />
                <div className={`absolute top-0 w-full h-full gap-4 flex flex-col p-8 pt-10 text-white z-10 ${isRTL ? 'items-end' : 'items-start'}`}>
                    <p className='uppercase font-bold text-xl'>{t('discover.trendingStyles')}</p>
                    <p className='capitalize text-4xl font-bold'>{t('discover.mensTitle')}</p>
                    <p className={`text-xl text-gray-200 tracking-wide font-poppins ${isRTL ? 'text-left' : 'text-right'}`}>
                        {t('discover.mensSubtitle')}
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default Discover;