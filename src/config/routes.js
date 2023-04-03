const routes = {
  notFound: '*',
  home: '/',
  login: '/login',
  contact: '/contact',
  signup: '/register',
  confirm: '/confirm',
  profile: '/profile/:nickname',
  forgetPassword: '/forgetpassword',
  cart: '/cart',
  wishlist: '/wishlist',
  about: '/about',
  checkout: '/checkout',
  product: '/product/:productId',
  products: '/products/:keyword?',
  category: '/category/:genre?',
  search: '/search/:keyword',
  community: '/community',
};

export default routes;
