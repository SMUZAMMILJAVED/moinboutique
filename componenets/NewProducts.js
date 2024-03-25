import React from 'react'
import styled from 'styled-components'
import Center from './Center';
import ProductsGrid from './ProductsGrid';

const Title=styled.h2`
font-size: 2rem;
font-weight:bolder;
margin: 30px 0px 20px;
`;
function NewProducts({products}) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products}/>
    </Center>
    
  )
}

export default NewProducts
