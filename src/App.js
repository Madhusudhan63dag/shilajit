import './App.css';
import About from './components/About';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Product from './components/Product';
import Review from './components/Review';

function App() {
  return (
    <div className="font-sans bg-black text-white over">
      <Header />
      <About />
      <Benefits />
      <Product />
      <Review />
      {/* <Contact /> */}
      <Footer />
      {/* You can add other sections here like About, Products, etc. */}
    </div>
  );
}

export default App;
