import Center from '@/componenets/Center';
import Footer from '@/componenets/Footer';
import Header from '@/componenets/Header'
import ProductsGrid from '@/componenets/ProductsGrid';
import Title from '@/componenets/Title';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Products';
import React from 'react'
import styled from 'styled-components'
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
`;
export default function products({products}) {
  return ( 
    <PageWrapper>
    <Header/>
    <MainContent>
    <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products}/>
    </Center>
    </MainContent>
     <Footer/>
   
    </PageWrapper>
  )
}



export async function getServerSideProps(){
    await mongooseConnect();
    const products = await Product.find({}, null, {sort: {'_id':-1}});
    return{
      props:{
        products:JSON.parse(JSON.stringify(products)),
       
      }
    }
  }