import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import styles from "./CarouselCategories.module.css";

import { useEffect } from "react";
import { getAllCategories } from "../../redux/thunks.js";
// import required modules
import { Pagination, Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CarouselCategories() {
  const categories = useSelector((state) => state.products.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
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
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link to={`/categories/${category.id}`}>
                <div className={styles.categoryContent}>
                  <img src={'http://localhost:3333/' + category.image} className={styles.category_img} alt={category.title} />
                  <p className={styles.category_title}>{category.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p>There are no available categories</p>
        )}
      </Swiper>
    </div>
  );
}

