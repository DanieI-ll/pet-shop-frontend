import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import styles from "./CarouselSales.module.css";

import { useEffect } from "react";
import { getAllProducts } from "../../redux/thunks.js";
// import required modules
import { Pagination, Autoplay} from "swiper/modules";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../pages/Products/Product/Product.jsx";

export default function CarouselSales() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
      <Swiper
        slidesPerView={4}
        spaceBetween={32}
        scrollbar={{ hide: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className={styles.mySwiper}
      >
        {products && products.length > 0 ? (
          products.map(
            (product) =>
              product.discont_price !== null && (
                <SwiperSlide key={product.id}>
                  <Product product={product} />
                </SwiperSlide>
              ),
          )
        ) : (
          <p>There are no available sales</p>
        )}
      </Swiper>
    </div>
  );
}

