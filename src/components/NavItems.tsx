"use client"
import { PRODUCTS_CATEGORIES } from '@/config'
import { useState,useRef,useEffect } from 'react'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const NavItems = () => {
const[activeIndex, setActiveIndex] = useState <null | number | string>(null)
const isAnyOpen = activeIndex !== null  

useEffect(() => {
  const handler = (e : KeyboardEvent) => {
    if(e.key === 'Escape') {
      setActiveIndex(null)
    }
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])


const navRef = useRef<HTMLDivElement | null>(null)
useOnClickOutside(navRef, () => setActiveIndex(null))
return (
   <div className="flex gap-4 h-full" ref={navRef}>
        {
          PRODUCTS_CATEGORIES.map((catagory,i) => {
            const handleOpen = () => {
              if(activeIndex === i) {
                setActiveIndex(null)
            } 
            else{
              setActiveIndex(i)
            }
          }
          const isOpen = i === activeIndex

            return (
              <NavItem category={catagory} handleOpen={handleOpen} isOpen={isOpen} key={catagory.value} isAnyOpen={isAnyOpen}/>
            )
          })}
   </div>
  )
}

export default NavItems