import { useTranslation } from 'react-i18next';
import aboutImg from "../assets/aboutImg.jpg";
import Word from "../components/Word";

const About = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <div className={`flex flex-col lg:flex-row items-center justify-center min-h-screen w-full mt-10 md:mt-16 gap-8 p-8 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className={`w-full max-w-[80vw] lg:w-1/2 relative ${isRTL ? 'lg:order-2' : ''}`}>
                <img
                    src={aboutImg}
                    alt={t('common.brandName')}
                    className="max-w-full h-full w-full"
                />
                <Word className={`absolute top-0 ${isRTL ? '-right-8' : '-left-8'} rotate-[-33deg] px-8 py-1 text-3xl font-bold`}>
                    {t('common.brandName')}
                </Word>
            </div>
            <div className={`max-w-lg ${isRTL ? 'pr-4' : 'pl-4'} space-y-4`}>
                <h2 className="font-semibold text-left text-3xl">
                    {t('about.title')}
                </h2>

                <p className="text-gray-600 font-poppins leading-6">
                    {t('about.content1')}
                </p>

                <p className="text-gray-600 font-poppins leading-6">
                    {t('about.content2')}
                </p>

                <p className="text-gray-600 font-poppins leading-6">
                    {t('about.content3')}
                </p>
            </div>
        </div>
    );
};

export default About;