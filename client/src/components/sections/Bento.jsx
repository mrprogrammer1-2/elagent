import Container from '../Container';
import bento1 from '../../assets/bento1.jpg';
import bento2 from '../../assets/bento2.jpg';
import bento3 from '../../assets/bento3.jpg';
import bento4 from '../../assets/bento4.jpg';
import { useTranslation, Trans } from 'react-i18next';

const Show = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section className={`w-full py-8 sm:py-10 md:py-20 bg-black ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className='space-y-2 text-center mb-6'>
        <h1 className='text-3xl font-semibold text-white'>
          {t('home.fashionTitle')}
        </h1>
        <p className='text-xl text-gray-300'>
          {t('home.fashionSubtitle')}
        </p>
      </div>

      <Container className={'bento'}>
        {/* Item 1 - Hero */}
        <div className='item-1 rounded-lg overflow-hidden relative'>
          <img
            src={bento1}
            loading='lazy'
            alt={t('home.fashionTitle')}
            className='hover:scale-105 transition-all duration-300 cursor-pointer h-full w-full max-w-full object-cover'
          />
          <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-0 w-[80%] max-w-[300px] pt-4 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12 font-poppins`}>
            <h3 className='text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold mb-1 sm:mb-2'>
              <Trans i18nKey="home.fashionTitle" />
            </h3>
            <p className='text-gray-400 text-xs sm:text-sm md:text-base'>
              <Trans i18nKey="home.fashionSubtitle" />
            </p>
          </div>
        </div>

        {/* Item 2 - New Arrivals */}
        <div className='item-2 rounded-lg overflow-hidden relative'>
          <img
            src={bento2}
            loading='lazy'
            alt={t('home.newArrivals')}
            className='hover:scale-105 transition-all duration-300 cursor-pointer h-full w-full max-w-full object-cover'
          />
          <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-0 w-[80%] max-w-[300px] pt-4 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12`}>
            <h3 className='text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold mb-1 sm:mb-2'>
              {t('home.newArrivals')}
            </h3>
            <p className='text-white text-xs sm:text-sm md:text-base'>
              {t('home.womensWear')}
            </p>
          </div>
        </div>

        {/* Item 3 - Trending */}
        <div className='item-3 rounded-lg overflow-hidden relative'>
          <img
            src={bento3}
            loading='lazy'
            alt={t('home.trendingTitle')}
            className='hover:scale-105 transition-all duration-300 cursor-pointer h-full w-full max-w-full object-cover'
          />
          <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-0 w-[80%] max-w-[300px] pt-4 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12`}>
            <h3 className='text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold mb-1 sm:mb-2'>
              {t('home.trendingTitle')}
            </h3>
            <p className='text-white text-xs sm:text-sm md:text-base'>
              {t('home.trendingSubtitle')}
            </p>
          </div>
        </div>

        {/* Item 4 - Kids */}
        <div className='item-4 rounded-lg overflow-hidden relative'>
          <img
            src={bento4}
            loading='lazy'
            alt={t('home.kidsTitle')}
            className='hover:scale-105 transition-all duration-300 cursor-pointer h-full w-full max-w-full object-cover'
          />
          <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-0 w-[80%] max-w-[300px] pt-4 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12`}>
            <h3 className='text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold mb-1 sm:mb-2'>
              {t('home.kidsTitle')}
            </h3>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Show;