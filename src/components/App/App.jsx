import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import CategoriesPage from '../../pages/Categories/CategoriesPage';
import AllProductsPage from '../../pages/Products/AllProducts/AllProductsPage';
import CategoryProductsPage from '../../pages/Products/CategoryProducts/CategoryProductsPage';
import DiscountedProductsPage from '../../pages/Products/DiscountedProducts/DiscountedProductsPage';
import ProductDetailsPage from '../../pages/Products/ProductDetails/ProductDetailsPage';
import CartPage from '../../pages/Cart/CartPage';

import '../../shared/styles/style.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryProductsPage />} />
        <Route path="/sales" element={<DiscountedProductsPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
