import config from '~/config';

// // Layouts
// import { HeaderOnly } from '~/layouts';

// // Pages
// import NotFound from '~/pages/NotFound';
import Home from '~/pages/Home';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Community from '~/pages/Community';
// import Category from '~/pages/Category';
// import Profile from '~/pages/Profile';
// import Product from '~/pages/Product';
// import Products from '~/pages/Products';
// import Search from '~/pages/Search';
// import Login from '~/pages/Login';
// import SignUp from '~/pages/SignUp';
// import ForgetPassword from '~/pages/ForgetPassword';
// import CartPage from '~/pages/CartPage';
// import WishListPage from '~/pages/WishListPage';
// import CheckoutPage from '~/pages/CheckoutPage';

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  // { path: config.routes.notFound, component: NotFound, layout: HeaderOnly },
  { path: config.routes.about, component: About },
  { path: config.routes.contact, component: Contact },
  // { path: config.routes.product, component: Product, layout: HeaderOnly },
  // { path: config.routes.products, component: Products, layout: HeaderOnly },
  // { path: config.routes.allProduct, component: Products, layout: HeaderOnly },
  // { path: config.routes.allProductWithDefaultPagination, component: Products, layout: HeaderOnly },
  // { path: config.routes.allProductWithPagination, component: Products, layout: HeaderOnly },
  // { path: config.routes.search, component: Search },
  // { path: config.routes.searchWithPagination, component: Search },
  // { path: config.routes.searchWithDefaultPagination, component: Search },
  // { path: config.routes.categoryWithPagination, component: Category },
  // { path: config.routes.categoryWithDefaultPagination, component: Category },
  // { path: config.routes.categoryWithGenre, component: Category },
  // { path: config.routes.category, component: Category, layout: HeaderOnly },
  { path: config.routes.community, component: Community },
];

// Private routes
const privateRoutes = [
  // { path: config.routes.profile, component: Profile },
  // { path: config.routes.cart, component: CartPage },
  // { path: config.routes.wishlist, component: WishListPage },
  // { path: config.routes.checkout, component: CheckoutPage },
];

// Auth routes
const authRoutes = [
  // { path: config.routes.login, component: Login },
  // { path: config.routes.signup, component: SignUp },
  // { path: config.routes.forgetPassword, component: ForgetPassword },
];

export { publicRoutes, privateRoutes, authRoutes };
