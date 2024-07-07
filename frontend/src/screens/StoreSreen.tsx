import { useState } from 'react'
import { Link } from 'react-router-dom'; 


interface IProduct {
  title: string;
  img: string;
  point: number;
  description: string;
  quantity: number;
}



const itemList: IProduct[] = [
  {
    title: "shirt",
    img: "/shirt2.png",
    point: 100,
    description: "fe",
    quantity: 20
  },
  {
    title: "fuckU",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },
  {
    title: "Kanye",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },
  {
    title: "King",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },{
    title: "King",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },{
    title: "King",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },{
    title: "King",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },{
    title: "King",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },{
    title: "King",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },{
    title: "King",
    img: "/shirt.png",
    point: 100,
    description: "fe",
    quantity: 20
  },
  
];

function StoreSreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<IProduct | null>(null);
  
  const filteredItems = itemList.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelected = (item: IProduct) => {
    setSelectedItem(item);
  };

  return (
    <div className='storescreen'>
        <div className='searchPanel'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#F9EEDA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input type="search" name="search" placeholder = "Search"value={searchTerm} onChange={(e : any) => setSearchTerm(e.target.value)}/>

        
        </div>
        <div className='itemLayout'>
          {filteredItems.map((item,idx)=>(
            <div className='item' key={idx}>
              <img src= {item.img} alt="" />
              <p>{item.title}</p>
              <p>{item.point} Point</p>
              <Link to={`/product/${item.title}`}>
              <button onClick={() => handleItemSelected(item)}>Buy</button>
              </Link>
              
            </div>
          ))}
        </div>
        
        
        
        
    </div>
  )
}

export default StoreSreen