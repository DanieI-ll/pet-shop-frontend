import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import styles from './Product.module.css';
import AppButton from '../../../shared/components/Button/AppButton';

export default function Product({ product }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isBtnActive, setIsBtnActive] = React.useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
    setIsBtnActive(true);
    setTimeout(() => {
      setIsBtnActive(false);
    }, 3000);
  };

  const discountPercentage = product.discont_price ? Math.ceil(((product.price - product.discont_price) / product.price) * 100) : null;

  {
    /* <button className={styles.add_to_cart_button} onClick={handleAddToCart} style={isBtnActive ? {backgroundColor: "#ffffff", color: "#282828", border: "1px solid #282828"} : {}}>
      {isBtnActive ? "Added" : "Add to cart"}
    </button> */
  }

  return (
    <div className={styles.product_box} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isHovered && <AppButton className={styles.add_to_cart_button} text={isBtnActive ? 'Added' : 'Add to cart'} isActive={isBtnActive} handleClick={handleAddToCart} />}
      <Link to={`/products/${product.id}`} className={styles.product_link}>
        <div className={styles.product_img_box}>
          <img src={`http://localhost:3333/${product.image}`} className={styles.product_img} alt={product.title} />
          {product.discont_price && (
            <div className={styles.discount_icon}>
              <p className={styles.discount}>-{discountPercentage}%</p>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px 32px 32px 32px',
            borderTop: '1px solid #DDDDDD',
          }}
        >
          <p
            className={styles.product_title}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.title}
          </p>
          <div>
            {product.discont_price ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <p className={styles.product_price}>${product.discont_price}</p>
                <p className={styles.old_price}>${product.price}</p>
              </div>
            ) : (
              <p className={styles.product_price}>${product.price}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
