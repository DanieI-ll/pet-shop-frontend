import React from 'react';
import styles from './DiscountedProductsPage.module.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { addToCart } from '../../../redux/slices/cartSlice';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs.jsx';
import Filter from '../../../components/Filter/Filter';
import sortProducts from '../../../utils/filteredProducts';
import Product from '../../../pages/Products/Product/Product';
import { getAllProducts } from '../../../redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function DiscountedProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, type === 'checkbox' ? checked : value);
    setSearchParams(newSearchParams);
  }

  const discountedProducts = products.filter((product) => product.discont_price !== null);

  const filteredProducts = sortProducts(discountedProducts, searchParams);

  return (
    <div className={styles.discountedProducts}>
      <BreadCrumbs
        items={[
          { path: '/', label: 'Main page' },
          { path: '/categories', label: 'All sales', isActive: true },
        ]}
      />

      <h2>Discounted items</h2>
      <Filter isDiscounted="true" handleChange={handleChange} />
      <div className={styles.discountedProducts_box}>{filteredProducts.length > 0 ? filteredProducts.map((product) => <Product key={product.id} product={product} addToCart={addToCart} />) : <p style={{ marginTop: '20px', fontSize: '30px', textAlign: 'center' }}>No products found</p>}</div>
    </div>
  );
}
