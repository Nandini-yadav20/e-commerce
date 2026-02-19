import React from 'react'
import Hero from '../components/Hero'
import NewCollection from '../components/NewCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Footer from '../components/Footer'
import AdminAddProduct from '../components/AdminAddProducts'
import AdminProductList from '../components/AdminProductList'

const Home = () => {
  return (
    <div>
      <Hero/>
   <NewCollection/>
   <BestSeller/>
  <OurPolicy/>
  <Footer/>
  <AdminProductList/>
    </div>
  )
}

export default Home