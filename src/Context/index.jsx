import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({})

  // Shopping Cart · Add products to cart
  const [cartProducts, setcartProducts] = useState([])

  // Shopping Cart · Order
  const [order, setOrder] = useState([])

  // Get products 
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  // Get products by title
  const [searchByTittle, setSearchByTittle] = useState(null)

   // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

const filteredItemsByTitle = (items, searchByTittle) => {
  return items?.filter(item => item.title.toLowerCase().includes(searchByTittle.toLowerCase()) )
}

const filteredItemsByCategory = (items, searchByCategory) => {
  return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()) )
}

const filterBy = (searchType, items, searchByTittle, searchByCategory) => {
  if (searchType === 'BY_TITLE') {
    return filteredItemsByTitle(items, searchByTittle)
  }
  if (searchType === 'BY_CATEGORY') {
    return filteredItemsByCategory(items, searchByCategory)
  }
  if (searchType === 'BY_TITLE_AND_CATEGORY') {
    return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTittle.toLowerCase()))
  }
  if (!searchType) {
    return items
  }

}

useEffect(() => {
  if (searchByTittle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTittle, searchByCategory))
  if (searchByTittle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTittle, searchByCategory))
  if (!searchByTittle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTittle, searchByCategory))
  if (!searchByTittle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTittle, searchByCategory))
}, [items, searchByTittle, searchByCategory])



  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setcartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTittle,
      setSearchByTittle,
      filteredItems,
      searchByCategory,
      setSearchByCategory
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}