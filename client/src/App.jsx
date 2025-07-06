import Header from "./components/Header"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Footer from "./components/Footer"
import { useContext, useEffect, useState, lazy, Suspense } from "react"
import CartModal from "./components/CartModal"
import Context from "./context/Context"
import Spinner from "./components/Spinner"
import api from "./api/axios"
import { products as pros } from "./assets/assets"

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Collection = lazy(() => import('./pages/Collection'))
const CartPage = lazy(() => import('./pages/CartPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const SingleProduct = lazy(() => import('./pages/SingleProduct'))



function App() {

  const [show, setShow] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const { user, loading, checkAuth, setProducts, accessToken } = useContext(Context)
  const [productLoading, setProductLoading] = useState(true) // Add loading state for products]

  const location = useLocation()

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth(); // Use the checkAuth from context
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products);
        setProductLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to static products only if API fails
        setProducts(pros);
        setProductLoading(false);
      }
    }
    // Always fetch from backend, regardless of auth status
    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [location])


  if (loading) {
    return <Spinner />
  }



  return (
    <main className="flex flex-col min-h-screen justify-between relative overflow-x-hidden">
      {show && <Header setShowCart={setShowCart} showCart={showCart} />}
      <CartModal showCart={showCart} setShowCart={setShowCart} />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        } />
        <Route path="/about" element={
          <Suspense fallback={<Spinner />}>
            <About />
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<Spinner />}>
            <Contact />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        } />
        <Route path="/register" element={
          <Suspense fallback={<Spinner />}>
            <Register />
          </Suspense>
        } />
        <Route path="/collection" element={
          <Suspense fallback={<Spinner />}>
            <Collection productLoading={productLoading} />
          </Suspense>
        } />
        <Route path="/cart" element={
          <Suspense fallback={<Spinner />}>
            <CartPage />
          </Suspense>
        } />
        <Route path='/products/:productId' element={
          <Suspense fallback={<Spinner />}>
            <SingleProduct />
          </Suspense>
        } />
        {user?.isAdmin ? <Route path="/dashboard" element={
          <Suspense fallback={<Spinner />}>
            <AdminPage />
          </Suspense>
        } /> : null}
        <Route path='*' element={
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
      {show && <Footer />}
    </main>
  )
}

export default App
