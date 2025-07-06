import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert(t('contact.submissionSuccess'));
    };

    return (
        <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {t('contact.title')}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('contact.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Contact Form */}
                <div className={`bg-white rounded-xl shadow-md p-6 sm:p-8 ${isRTL ? 'md:order-2' : ''}`}>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        {t('contact.sendMessage')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('contact.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder={t('contact.namePlaceholder')}
                                required
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('contact.emailAddress')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder={t('contact.emailPlaceholder')}
                                required
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('contact.subject')}
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder={t('contact.subjectPlaceholder')}
                                required
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('contact.message')}
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder={t('contact.messagePlaceholder')}
                                required
                                dir={isRTL ? 'rtl' : 'ltr'}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                        >
                            {t('contact.send')}
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            {t('contact.contactInfo')}
                        </h2>

                        <div className="space-y-5">
                            <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <MapPin className={`h-6 w-6 text-blue-600 mt-1 ${isRTL ? 'ml-4' : 'mr-4'} flex-shrink-0`} />
                                <div className={isRTL ? 'text-right' : 'text-left'}>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {t('contact.location')}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t('contact.locationAddress')}
                                    </p>
                                </div>
                            </div>

                            <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Mail className={`h-6 w-6 text-blue-600 mt-1 ${isRTL ? 'ml-4' : 'mr-4'} flex-shrink-0`} />
                                <div className={isRTL ? 'text-right' : 'text-left'}>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {t('contact.email')}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t('contact.emailAddresses')}
                                    </p>
                                </div>
                            </div>

                            <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Phone className={`h-6 w-6 text-blue-600 mt-1 ${isRTL ? 'ml-4' : 'mr-4'} flex-shrink-0`} />
                                <div className={isRTL ? 'text-right' : 'text-left'}>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {t('contact.call')}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t('contact.phoneNumber')}<br />
                                        {t('contact.callHours')}
                                    </p>
                                </div>
                            </div>

                            <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Clock className={`h-6 w-6 text-blue-600 mt-1 ${isRTL ? 'ml-4' : 'mr-4'} flex-shrink-0`} />
                                <div className={isRTL ? 'text-right' : 'text-left'}>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {t('contact.hours')}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t('contact.weekdays')}<br />
                                        {t('contact.saturday')}<br />
                                        {t('contact.sunday')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            {t('common.follow')}
                        </h2>
                        <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                            {['Facebook', 'Instagram', 'Twitter', 'Pinterest'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition"
                                    aria-label={social}
                                >
                                    <span className="text-gray-700 font-medium">{social.charAt(0)}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 bg-gray-200 rounded-xl overflow-hidden h-64 md:h-80">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <p>{t('contact.map')}</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;