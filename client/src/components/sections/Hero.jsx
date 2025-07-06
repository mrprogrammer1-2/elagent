import heroImg from '../../assets/heroImg.png'
import Word from '../Word'
import Container from '../Container'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'


const Hero = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <section className='relative w-full min-h-[calc(100vh-70px)] bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 overflow-hidden'>
            {/* Background decorative elements */}
            <div className='absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl'></div>
            <div className='absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl'></div>

            <Container className='relative z-10 flex flex-col-reverse gap-8 md:flex-row justify-between items-center min-h-[calc(100vh-70px)] py-12'>
                {/* Hero Image */}
                <div className='relative flex-1 flex justify-center md:justify-start'>
                    <div className='relative'>
                        <img
                            src={heroImg}
                            className='max-w-[400px] md:max-w-[520px] w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-700 ease-out'
                            alt='Hero fashion model'
                        />
                        {/* Image backdrop */}
                        <div className='absolute -inset-4 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 rounded-2xl -z-10 blur-xl'></div>
                    </div>
                </div>

                {/* Hero Content */}
                <div className='flex-1 px-4 md:pr-8 text-center md:text-right max-w-2xl'>
                    {/* Main headline */}
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-800 leading-tight mb-6'>
                        <Trans i18nKey={'hero.intro'}>
                            Discover timeless sophistication where every detail whispers <Word className='bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-lg rotate-2 inline-block shadow-lg'>elegant</Word> perfection.
                        </Trans>
                    </h1>

                    {/* Subtitle */}
                    <p className='text-lg md:text-xl text-slate-600 mb-8 font-poppins leading-relaxed'>
                        Curated collections that blend modern trends with timeless elegance
                    </p>

                    {/* CTA Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-end'>
                        <button onClick={() => navigate('/collection')} className='bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-teal-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
                            Shop Collection
                        </button>
                        <button onClick={() => navigate('/about')} className='border-2 border-teal-300 text-slate-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-teal-400 hover:bg-teal-50 transition-all duration-300'>
                            Learn More
                        </button>
                    </div>

                    {/* Stats or features */}
                    <div className='flex justify-center md:justify-end gap-8 mt-12 text-center'>
                        <div>
                            <div className='text-2xl font-bold text-slate-800'>500+</div>
                            <div className='text-sm text-slate-600'>Products</div>
                        </div>
                        <div>
                            <div className='text-2xl font-bold text-slate-800'>50k+</div>
                            <div className='text-sm text-slate-600'>Happy Customers</div>
                        </div>
                        <div>
                            <div className='text-2xl font-bold text-slate-800'>4.9★</div>
                            <div className='text-sm text-slate-600'>Rating</div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Hero