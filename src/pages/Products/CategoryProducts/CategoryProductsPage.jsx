import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Product from '../../../pages/Products/Product/Product.jsx';
import styles from './CategoryProductsPage.module.css';
import { addToCart } from '../../../redux/slices/cartSlice';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs.jsx';
import NotFoundPage from '../../NotFound/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../../../redux/thunks';
import { CircularProgress } from '@mui/material';
import Filter from '../../../components/Filter/Filter.jsx';
import sortProducts from '../../../utils/filteredProducts';
import { useLocation } from 'react-router-dom';

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const products = useSelector((state) => state.products.products);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    dispatch(getProductsByCategory(categoryId))
      .then(({ payload }) => {
        if (payload?.category && payload?.data) {
          setCategoryName(payload.category.title);
        } else {
          setError('Category not found or no products available.');
        }
      })
      .catch(() => {
        setError('An error occurred while fetching products.');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, dispatch]);

  if (isLoading) return <CircularProgress />;
  if (error) return <NotFoundPage />;

  const filteredProducts = sortProducts(products, searchParams);

  return (
    <div className={styles.productsByCategory}>
      <BreadCrumbs
        items={[
          { path: '/', label: 'Main page' },
          { path: '/categories', label: 'Categories' },
          { path: `/categories/${categoryId}`, label: categoryName, isActive: true },
        ]}
      />
      <h2 className={styles.productsByCategory_title}>{categoryName}</h2>
      <Filter />
      {filteredProducts.length > 0 ? (
        <div className={styles.productsByCategory_box}>
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <p style={{ marginTop: '20px', fontSize: '30px', textAlign: 'center' }}>No products found</p>
      )}
    </div>
  );
}
