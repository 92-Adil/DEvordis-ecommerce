import React from 'react'
import HeroCarousel from './HeroCarousel'
import HeroSidebar from './HeroSidebar'

const HeroSection = () => {
  return (
    <div className='flex items-stretch  w-full h-[430px]'>
        <HeroSidebar/>
        <HeroCarousel />

    </div>
  )
}

export default HeroSection