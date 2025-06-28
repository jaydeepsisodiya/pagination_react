import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1);
  const fetchproduct=async()=>{
    const result=await fetch(`https://dummyjson.com/products?limit=100`);
    const data=await result.json();
    console.log(data.products)
    setProducts(data.products);
  }

  const selectedpage=(selectedpage)=>{
    if(selectedpage>0&&selectedpage<=products.length/10)
    setPage(selectedpage)
  }
  useEffect(()=>{
    fetchproduct()

  },[])

  return (
    <>
     <div className='products'>
     {
      products.length>0&&products.slice(page*10-10,page*10).map((item)=>(
        <div className='product_item'>
        <img src={item.thumbnail}/>
        <span>{item.title}</span>
        </div>
      ))
     }
        </div>
        <div className='pagination'>
        <span onClick={()=>selectedpage(page-1)}>prev</span>
        {
          [...Array(products.length/10)].map((_,i)=>(
            <span  className={page==i+1?'pagination_selected':''} onClick={()=>selectedpage(i+1)}>{i+1}</span>
          ))
          }
        <span onClick={()=>selectedpage(page+1)}>Next</span>
        </div>
    </>
  )
}

export default App
