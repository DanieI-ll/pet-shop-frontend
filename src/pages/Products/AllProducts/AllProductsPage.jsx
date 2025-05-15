import styles from './AllProductsPage.module.css';
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
import axios from 'axios';

export default function AllProductsPage() {
  axios.get(`${import.meta.env.VITE_API_URL}/api/products`);

  const [searchParams] = useSearchParams();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredProducts = sortProducts(products, searchParams);

  return (
    <div className={styles.allProducts}>
      <BreadCrumbs
        items={[
          { path: '/', label: 'Main page' },
          { path: '/categories', label: 'All products', isActive: true },
        ]}
      />

      <h2>All products</h2>
      <Filter />
      <div className={styles.allProducts_box}>{filteredProducts.length > 0 ? filteredProducts.map((product) => <Product key={product.id} product={product} addToCart={addToCart} />) : <p style={{ marginTop: '20px', fontSize: '30px', textAlign: 'center' }}>No products found</p>}</div>
    </div>
  );
}
