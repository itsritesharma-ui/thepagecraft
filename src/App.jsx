import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Ticker from './components/Ticker'
import Navbar from './components/Navbar'
import CartPanel from './components/CartPanel'
import AuthPage from './pages/AuthPage'
import AccountPage from './pages/AccountPage'
import HomePage from './pages/HomePage'
import EbooksPage from './pages/EbooksPage'
import BookDetailPage from './pages/BookDetailPage'
import BookReaderPage from './pages/BookReaderPage'
<<<<<<< HEAD
=======
import DailyPostPage from './pages/DailyPostPage'
import { useContent } from './context/ContentContext'
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
import AnimatedBackground from './components/AnimatedBackground'
import PageTransition from './components/PageTransition'
import MyBooksPage from './pages/MyBooksPage'
import ContactPage from './pages/ContactPage'
import ThemeToggle from './components/ThemeToggle'
import SearchOverlay from './components/SearchOverlay'
import styles from './App.module.css'

function getPage() {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/ebooks')) return 'ebooks'
    if (path.startsWith('/contact')) return 'contact'
    if (path.startsWith('/read/')) return 'reader'
<<<<<<< HEAD
=======
    if (path.startsWith('/post/')) return 'daily-post'
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
    if (path.startsWith('/payment-success')) return 'payment-success'
    if (path.startsWith('/payment-failed')) return 'payment-failed'
  }
  return 'home'
}

<<<<<<< HEAD
export default function App() {
=======
function getInitialPostSlug() {
  if (typeof window !== 'undefined') {
    const match = window.location.pathname.match(/^\/post\/([^/]+)/)
    if (match) return match[1]
  }
  return null
}

export default function App() {
  const { posts } = useContent()
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [myBooksOpen, setMyBooksOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(getPage())
  const [readerBookId, setReaderBookId] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
<<<<<<< HEAD
=======
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedPostSlug, setSelectedPostSlug] = useState(getInitialPostSlug)
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (event === 'SIGNED_IN' && currentUser) setAuthOpen(false)
      if (event === 'SIGNED_OUT') { setAccountOpen(false); setCart([]) }
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
<<<<<<< HEAD
    const handlePopState = () => { setPage(getPage()); setSelectedBook(null) }
=======
    const handlePopState = () => {
      setPage(getPage())
      setSelectedBook(null)
      setSelectedPostSlug(getInitialPostSlug())
    }
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

<<<<<<< HEAD
=======
  useEffect(() => {
    if (!selectedPostSlug) {
      setSelectedPost(null)
      return
    }
    setSelectedPost(posts.find(post => post.slug === selectedPostSlug) || null)
  }, [posts, selectedPostSlug])

>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
  const navigate = (to) => {
    window.history.pushState({}, '', to)
    if (to.startsWith('/ebooks')) setPage('ebooks')
    else if (to.startsWith('/contact')) setPage('contact')
    else setPage('home')
    setSelectedBook(null)
<<<<<<< HEAD
=======
    setSelectedPost(null)
    setSelectedPostSlug(null)
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
    const hashIdx = to.indexOf('#')
    if (hashIdx !== -1) {
      const id = to.slice(hashIdx + 1)
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 50)
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  const openReader = (bookId) => {
    setReaderBookId(bookId)
    setPage('reader')
    window.history.pushState({}, '', `/read/${bookId}`)
    window.scrollTo(0, 0)
  }
  const closeReader = () => navigate('/ebooks')

  const openBookDetail = (book) => {
<<<<<<< HEAD
=======
    setSelectedPost(null)
    setSelectedPostSlug(null)
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
    setSelectedBook(book)
    window.history.pushState({}, '', `/ebooks/${book.id}`)
    window.scrollTo(0, 0)
  }
  const closeBookDetail = () => {
    setSelectedBook(null)
    window.history.pushState({}, '', '/ebooks')
    window.scrollTo(0, 0)
  }

<<<<<<< HEAD
=======
  const openPost = (post) => {
    setSelectedBook(null)
    setSelectedPostSlug(post.slug)
    setSelectedPost(post)
    window.history.pushState({}, '', `/post/${post.slug}`)
    window.scrollTo(0, 0)
  }
  const closePost = () => {
    setSelectedPost(null)
    setSelectedPostSlug(null)
    window.history.pushState({}, '', '/')
    setPage('home')
    window.scrollTo(0, 0)
  }

>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
  const addToCart = (product) => setCart(prev => prev.find(i => i.id === product.id) ? prev : [...prev, product])
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const isReader = page === 'reader'

  if (isReader) {
    return (
      <div className={styles.app}>
        <PageTransition pageKey="reader">
          <BookReaderPage productId={readerBookId} onBack={closeReader} />
        </PageTransition>
        <ThemeToggle />
      </div>
    )
  }

<<<<<<< HEAD
  const pageKey = selectedBook ? `book-${selectedBook.id}` : page
=======
  const pageKey = selectedBook ? `book-${selectedBook.id}` : selectedPost ? `post-${selectedPost.slug}` : page
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)

  return (
    <div className={styles.app}>
      <AnimatedBackground />
      <div className={styles.content}>
        <Ticker />
        <Navbar
          cartCount={cart.length}
          onCartOpen={() => setCartOpen(true)}
          user={user}
          onAuthOpen={() => setAuthOpen(true)}
          onAccountOpen={() => setAccountOpen(true)}
          onMyBooksOpen={() => setMyBooksOpen(true)}
          onNavigate={navigate}
          currentPage={page}
        />

        <main>
          <PageTransition pageKey={pageKey}>
<<<<<<< HEAD
            {page === 'home' && !selectedBook && <HomePage onAuthOpen={() => setAuthOpen(true)} user={user} onNavigate={navigate} />}
            {page === 'ebooks' && !selectedBook && (
=======
            {page === 'home' && !selectedBook && !selectedPost && <HomePage onAuthOpen={() => setAuthOpen(true)} user={user} onNavigate={navigate} onOpenPost={openPost} />}
            {page === 'ebooks' && !selectedBook && !selectedPost && (
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
              <EbooksPage
                cart={cart}
                onAdd={addToCart}
                user={user}
                onAuthOpen={() => setAuthOpen(true)}
                onSelectBook={openBookDetail}
              />
            )}
<<<<<<< HEAD
            {page === 'contact' && !selectedBook && <ContactPage />}
=======
            {page === 'contact' && !selectedBook && !selectedPost && <ContactPage />}
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
            {page === 'payment-success' && (
  <div style={{
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 20px'
  }}>
    <div>
      <h1>Payment Successful ✓</h1>
      <p>Your payment has been received successfully.</p>
<<<<<<< HEAD
      <button onClick={() => navigate('ebooks')}>
=======
      <button onClick={() => navigate('/ebooks')}>
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
        Back to eBooks
      </button>
    </div>
  </div>
)}

{page === 'payment-failed' && (
  <div style={{
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 20px'
  }}>
    <div>
      <h1>Payment Failed</h1>
      <p>Your payment could not be completed. No order has been confirmed.</p>
<<<<<<< HEAD
      <button onClick={() => navigate('ebooks')}>
=======
      <button onClick={() => navigate('/ebooks')}>
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
        Try Again
      </button>
    </div>
  </div>
)}
            {selectedBook && (
              <BookDetailPage
                product={selectedBook}
                onBack={closeBookDetail}
                cart={cart}
                onAdd={addToCart}
                user={user}
                onAuthOpen={() => setAuthOpen(true)}
              />
            )}
<<<<<<< HEAD
=======
            {selectedPost && (
              <DailyPostPage post={selectedPost} onBack={closePost} />
            )}
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
          </PageTransition>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <div>
              <p className={styles.footerLogo}>The Pagecraft</p>
              <p className={styles.footerTagline}>Books that matter. Stories that last.</p>
            </div>
            <div className={styles.footerLinks}>
              <button onClick={() => navigate('/')}>Home</button>
              <button onClick={() => navigate('/ebooks')}>eBooks</button>
              <button onClick={() => navigate('/contact')}>Contact</button>
              <button onClick={() => user ? setAccountOpen(true) : setAuthOpen(true)}>
                {user ? 'My Account' : 'Login'}
              </button>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} The Pagecraft — thepagecraft.in. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <SearchOverlay onNavigate={navigate} onSelectBook={openBookDetail} />
      <ThemeToggle />
      {cartOpen && <CartPanel cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} user={user} />}
      {authOpen && <AuthPage onClose={() => setAuthOpen(false)} onAuth={setUser} />}
      {myBooksOpen && <MyBooksPage user={user} onClose={() => setMyBooksOpen(false)} />}
      {accountOpen && user && (
        <AccountPage
          user={user}
          onClose={() => setAccountOpen(false)}
          onLogout={() => setUser(null)}
          onNavigate={navigate}
        />
      )}
    </div>
  )
}
