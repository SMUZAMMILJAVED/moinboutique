import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;
const ProductWrapper = styled.div``;
const Title = styled(Link)`
  font-size: 0.9rem;
  font-weight: normal;
  margin: 0;
  color:inherit;
  text-decoration: none;
`;
const ProductInfoBox = styled.div`
margin-top:5px;
`;
const PriceRow=styled.div`
display:block;
align-items:center;
justify-content: space-between;
margin-top:2px;
gap: 5px;
@media screen and (min-width: 768px) {
  display:flex;
}
`;
const Price=styled.div`
font-size:1rem;
font-weight: bold;
text-align: right;
@media screen and (min-width: 768px) {
  font-size:1.2rem;
font-weight: bold;
text-align: left;
}
`;
function ProductBox({ _id, title, decription, price, images }) {
  const {addProduct}=useContext(CartContext);
  const url='/product/'+_id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]}></img>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
          Rs.{price}
          </Price>
          <Button block onClick={()=>addProduct(_id)} primary={1} outline={1}>Add to cart</Button>
        </PriceRow>
       
        
      </ProductInfoBox>
    </ProductWrapper>
  );
}

export default ProductBox;
