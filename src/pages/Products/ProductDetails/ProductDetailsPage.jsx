import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.css';
import AppButton from '../../../shared/components/Button/AppButton';
import { addToCart } from '../../../redux/slices/cartSlice';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs.jsx';
import NotFoundPage from '../../NotFound/NotFoundPage';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories, getProductById } from '../../../redux/thunks';
import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.product);
  const categories = useSelector((state) => state.products.categories);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const [isBtnActive, setIsBtnActive] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    dispatch(getProductById(productId))
      .then(({ payload }) => {
        if (!payload || payload.length === 0) {
          setError('Product not found.');
          return;
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('An error occurred fetching data. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId, dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product && product.length > 0 && categories.length > 0) {
      const foundCategory = categories.find((c) => c.id === product[0].categoryId);
      if (foundCategory && foundCategory.title !== categoryName) {
        setCategoryName(foundCategory.title);
      }
    }
  }, [product, categories, categoryName]);
  

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error === 'Product not found.') {
    return <NotFoundPage />;
  }

  if (error) {
    return <p style={{ marginTop: '20px', fontSize: '30px', textAlign: 'center' }}>{error}</p>;
  }

  if (!product || product.length === 0) {
    return <NotFoundPage />;
  }
  
  const { title = '', price = 0, discont_price = null, image = '', description = '', categoryId = null } = product[0] || {};
  
  const realPrice = discont_price || price;
  const oldPrice = discont_price ? price : null;
  const discountPercentage = discont_price ? Math.ceil(((price - discont_price) / price) * 100) : null;

  const truncatedDescription = description.length > 383 ? `${description.slice(0, 383)}...` : description;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product[0], quantity }));
    setIsBtnActive(true);
    setTimeout(() => {
      setIsBtnActive(false);
    }, 3000);
  };

  return (
    <div className={styles.ProductDetailsPage}>
      <BreadCrumbs
        items={[
          { path: '/', label: 'Main page' },
          { path: '/categories', label: 'Categories' },
          {
            path: `/categories/${categoryId}`,
            label: categoryName,
            isActive: false,
          },
          { path: '', label: title, isActive: true, type: 'title' },
        ]}
      />
      <div className={styles.ProductDetailsPageBox}>
        <div className={styles.ProductDetailsPageBox_item}>
          <div className={styles.ProductDetailsPageBox_itemImg_right}>
            <img src={`http://localhost:3333${image}`} alt={title} />
          </div>

          <div className={styles.ProductDetailsPageBox_itemInfo}>
            <div className={styles.ProductDetailsPageBox_itemInfo_title}>
              <h4>{title}</h4>
            </div>
            <div className={styles.ProductDetailsPageBox_itemInfo_price}>
              <p className={styles.realPrice}>$ {(realPrice * quantity).toFixed(2)}</p>
              {oldPrice && <p className={styles.discountPrice}>$ {(oldPrice * quantity).toFixed(2)}</p>}
              {discountPercentage && (
                <div className={styles.discountPercent}>
                  <p>{discountPercentage}%</p>
                </div>
              )}
            </div>

            <div className={styles.ProductDetailsPageBox_itemInfo_buttonsBox}>
              <div className={styles.ProductDetailsPageBox_itemInfo_buttonsCounter}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <div className={styles.ProductDetailsPageBox_itemInfo_buttonsAddButton}>
                <AppButton text={isBtnActive ? 'Added' : 'Add to cart'} handleClick={handleAddToCart} className={styles.add_to_cart_button} isActive={isBtnActive}>
                  Add to cart
                </AppButton>
              </div>
            </div>
            <div className={styles.ProductDetailsPageBox_itemInfo_description}>
              <h6>Description</h6>
              {description.length < 683 ? (
                description
              ) : (
                <>
                  <p>{isExpanded ? description : truncatedDescription}</p>
                  <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Read less' : 'Read more'}</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
