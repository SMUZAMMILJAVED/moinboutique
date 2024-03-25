import Button from "@/componenets/Button";
import { CartContext } from "@/componenets/CartContext";
import Center from "@/componenets/Center";
import Header from "@/componenets/Header";
import Input from "@/componenets/Input";
import Table from "@/componenets/Table";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
const Loader = () => <div>Loading...</div>;
const Box = styled.div`
background-color: #fff;
border-radius: 10px;
padding: 30px;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns:1fr ;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
  grid-template-columns:1.2fr .8fr;
}
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
    max-width: 80px;
    max-height: 80px;
  }
}
`;
const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
}
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
function Cart() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  
  // const [isSuccess,setIsSuccess] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false); //chat gpt
  useEffect(() => {
    if (cartProducts.length > 0) {
      setIsLoading(true); // Set loading state to true
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        setIsLoading(false); // Set loading state to false when data is fetched
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(()=>{
    if (isOrderSuccess) {
      setIsOrderSuccess(true);
      clearCart();
    }

  },[isOrderSuccess])
  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };
  // const goToOrder=async()=>{
  //  const response= await axios.post('/api/checkout',{
  //     name,number,city,postalCode,streetAddress,country,cartProducts,
  //   });
  
  //   }

 //chat gpt start
 async function goToOrder() {

  try {
    if (
      name.trim() === "" ||
      number.trim() === "" ||
      city.trim() === "" ||
      postalCode.trim() === "" ||
      streetAddress.trim() === "" ||
      country.trim() === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all required fields.",
        icon: "error"
      });
      return; // Exit function if any field is empty
    }

    const verifyNumber = await Swal.fire({
      title: "Please Verify Your Phone Number",
      html: `Please confirm that your phone number is <strong>${number.trim()}</strong>.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Edit Number"
    });
    if (verifyNumber.isConfirmed) {
    const response = await axios.post('/api/checkout', {
      name, number, city, postalCode, streetAddress, country,
      cartProducts,total,
    });

    if (response.data.url) {
      // Redirect to payment page if needed
      window.location = response.data.url;
    }

    // Set the state to indicate a successful order
    setIsOrderSuccess(true);
  } else {
    // If the user chooses to edit the number, focus on the number input field
    const numberInput = document.getElementById("number");
    if (numberInput) {
      numberInput.focus();
    }

  }} catch (error) {
    console.error('Error placing order:', error);
    // Handle the error as needed
  }
}

// ... (remaining code)



//... end

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
 //check start
 if (isOrderSuccess) {
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Thanks for your order!</h1>
            <p>We will Call you For your Order Confirmation.</p>
          </Box>
        </ColumnsWrapper>
      </Center>
    </>
  );
}
 //check end
  return (
    <>
      <Header />

      <Center>
        <ColumnsWrapper>
        {isLoading ? ( // Check if loading
          <div>loading...</div>
        ) : (
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your Cart is Empty</div>}
            {}
            {cartProducts.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>

                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        Rs.
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Your Item</td>
                    <td></td>
                    <td>Rs.{total}</td>
                  </tr>
                  <tr>
                    <td>delivery</td>
                    <td></td>
                    <td>Rs.250</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td>Rs.{total+250}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
        )}
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              
                <Input
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                ></Input>
                <Input
                id='number'
                type='number'
                  placeholder="Phone Number"
                  value={number}
                  name="number"
                  onChange={(ev) => setNumber(ev.target.value)}
                ></Input>
                <CityHolder>
                  <Input
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  ></Input>
                  <Input
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  ></Input>
                </CityHolder>

                <Input
                  placeholder="Street Address (complete address)"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                ></Input>
                <Input
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                ></Input>
                
                <Button block={1} black={1} onClick={goToOrder}>
                  Order Now
                </Button>
              
            </Box>
          
          )}
        </ColumnsWrapper>
      </Center>
      
    </>
  );
}

export default Cart;
