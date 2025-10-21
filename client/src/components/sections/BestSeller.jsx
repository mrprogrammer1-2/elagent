import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { products } from "../../assets/assets";
import SwiperProduct from "../SwiperProduct";
import { useEffect, useState } from "react";

const BestSeller = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [slidesNum, setSlidesNum] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) setSlidesNum(1);
      else if (window.innerWidth < 800) setSlidesNum(2);
      else if (window.innerWidth < 1200) setSlidesNum(3);
      else setSlidesNum(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bestSellers = products
    .filter((pro) => pro.image?.length > 0)
    .slice(0, 10);

  return (
    <div className="w-full sm:py-4 md:py-8 pt-20">
      <h1 className="text-5xl font-bold mb-2 text-center">
        {t("products.bestSellers")}
      </h1>
      <div className="swiper-container py-20 my-4 flex items-center">
        <div className="button-prev"></div>
        <div className="swiper-pagination"></div>
        <Swiper
          dir={isRTL ? "rtl" : "ltr"}
          rtl={isRTL}
          onInit={(swiper) => {
            if (i18n.language === "ar") {
              swiper.changeDirection("rtl");
            }
          }}
          onLanguageChange={(swiper) => {
            swiper.changeDirection(i18n.language === "ar" ? "rtl" : "ltr");
          }}
          spaceBetween={10}
          slidesPerView={slidesNum}
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          navigation={{ nextEl: ".button-next", prevEl: ".button-prev" }}
          loop={bestSellers.length > 6}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          keyboard={{ enabled: true }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          className="max-w-[1200px]"
        >
          {bestSellers.map((pro, index) => (
            <SwiperSlide key={index}>
              <SwiperProduct product={pro} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="button-next"></div>
      </div>
    </div>
  );
};

export default BestSeller;
