import React from 'react'
import './Home.scss'
import Categories from '../../component/Home/Categories'
import Popular from '../../component/Home/Popular'
import HealthCare from '../../component/Home/HealthCare'
import Blog from '../../component/Home/Blog'
import DownloadApp from '../../component/Home/DownloadApp'
import LandingPage from '../../component/Home/LandingPage'
import Footer from '../../component/footer/Footer'
const Home = () => {
  return (
    <>
        <header  className="home">
            <LandingPage/>
        </header>
            {/* Categories */}
        <Categories/> 
            {/*  Most popular caregiver*/}
        <Popular />
            {/* More healt hcare */}
        <HealthCare/>
            {/* Blog */}
        <section   className="blog  d-flex  align-items-center justify-content-center">
            <div className="container p-2  ">
                <div className="row g-3 ">
                    <Blog/>
                    <Blog/>
                    <Blog/>
                </div>
            </div>
        </section>
            {/* Download */}
        <DownloadApp/>
        <Footer/>

    </>
  )
}

export default Home