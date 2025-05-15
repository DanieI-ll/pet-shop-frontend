import React from "react";
import styles from "./MainPage.module.css";
import { Link, useLocation } from "react-router-dom";
import CarouselCategories from "../../components/CarouselCategories/CarouselCategories";
import CarouselSales from "../../components/CarouselSales/CarouselSales";
import DiscountForm from "../../components/DiscountForm/DiscountForm";

export default function MainPage() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>Amazing Discounts on Pets Products!</h1>
        <Link style={{ alignSelf: "start" }} to="/sales">
          <div className={styles.banner_bnt} style={{ padding: "16px 56px" }}>
            Check out
          </div>
        </Link>
      </div>
      <div className={styles.categories_container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "32px",
          }}
        >
          <h2 className={styles.categories_main_title}>Categories</h2>
          <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#DDDDDD" }}></div>
          <div className={styles.categories_bnt_container}>
            <Link style={{ alignSelf: "end" }} to="/categories">
              <div className={styles.categories_bnt}>All categories</div>
            </Link>
          </div>
        </div>
        <CarouselCategories />
      </div>
      <div className={styles.discount_form_container}>
        <DiscountForm />
      </div>
      <div className={styles.sales_container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "32px",
          }}
        >
          <h2 className={styles.sales_main_title}>Sale</h2>
          <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#DDDDDD" }}></div>
          <div className={styles.sales_bnt_container}>
            <Link style={{ alignSelf: "end" }} to="/sales">
              <div className={styles.sales_bnt}>All sales</div>
            </Link>
          </div>
        </div>
        <CarouselSales />
      </div>
    </div>
  );
}

