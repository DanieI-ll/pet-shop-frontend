import React from 'react'
import styles from './CategoriesPage.module.css'

import { Link } from "react-router-dom";
import { useEffect } from "react";

import Breadcrumbs from "../../components/breadCrumbs/BreadCrumbs";

import { getAllCategories } from "../../redux/thunks";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function CategoriesPage() {
  const categories = useSelector((state) => state.products.categories);
  const dispatch = useDispatch();

  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className={styles.categories}>
      <Breadcrumbs className={styles.categories_breadcrumbs}
        items={[
          { path: "/", label: "Main page" },
          { path: "/categories", label: "Categories", isActive: true },
        ]}
      />

      <h2 className={styles.categories_main_title}>Categories</h2>

      <div className={styles.categories_box}>
        {categories.map((category) => (
          <Link key={category.id} to={`/categories/${category.id}`}>
            <div className={styles.categories_item_box}>
              <img
                src={"http://localhost:3333/" + category.image}
                alt={category.title}
                className={styles.categories_item}
              />
              <p className={styles.categories_item_title}>{category.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
