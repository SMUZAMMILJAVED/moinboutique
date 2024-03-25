import Button from '@/componenets/Button'
import { CartContext } from '@/componenets/CartContext'
import Center from '@/componenets/Center'
import Header from '@/componenets/Header'
import ProductImages from '@/componenets/ProductImages'
import Title from '@/componenets/Title'
import WhiteBox from '@/componenets/WhiteBox'
import CartIcon from '@/componenets/icons/CartIcon'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Products'
import React, { useContext } from 'react'
import styled from 'styled-components'
const ColWrapper=styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 40px;
margin:40px 0;
@media screen and (min-width: 768px) {
  grid-template-columns: .8fr 1.2fr;
}
`;
const PriceRow=styled.div`
gap: 20px;
display: flex;
align-items: center;

`;
const Price=styled.span`
font-size: 1.4rem;
`;
export default function ProductPage({product}) {
  const{addProduct}=useContext(CartContext);
  return (
    <>
     <Header/>
    <Center>
        <ColWrapper>
        <WhiteBox>
           <ProductImages images={product.images}/>
        </WhiteBox>
        <div>
        <Title>{product.title}</Title>
        <p>{product.description}</p>
        <PriceRow>
          <Price>
          <div>
             Rs.{product.price}
          </div>
          </Price>
         <div>
           <Button onClick={()=>addProduct(product._id)} primary={1}><CartIcon/>Add to Cart</Button>
         </div>
         
        </PriceRow>
        
        </div>
        </ColWrapper>
        
    </Center>
    
    </>
    
  )
}

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id}=context.query;
    const product = await Product.findById(id);
    return{
      props:{
        product:JSON.parse(JSON.stringify(product)),
       
      }
    }
  }