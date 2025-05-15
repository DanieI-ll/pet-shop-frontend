import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import img_404 from '../../assets/images/img_404.svg';

export default function NotFoundPage() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className={styles.notFound_container}>
      <div className={styles.notFound_img_container}>
        <img src={img_404} alt="Issue 404" />
      </div>
      <div className={styles.notFound_text_container}>
        <h2>Page Not Found</h2>
        <p>We’re sorry, the page you requested could not be found. Please go back to the homepage.</p>
        <Link to="/">
          <button>Go Home</button>
        </Link>
      </div>
    </div>
  );
}
