import Featured from "@/componenets/Featured";
import Header from "@/componenets/Header";
import NewProducts from "@/componenets/NewProducts";
import { Product } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";
import Footer from "@/componenets/Footer";

export default function HomePage({featuredProduct,newProducts}) {
  
  return (
    
     <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
      <Footer/>
     </div>
  )
}

export async function getServerSideProps(){
  // const newProductsCheck = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const featuredProductId='6585d6762fda3e0b7ae4ea66';
  // const featuredProductId=newProductsCheck[0]._id;
  await mongooseConnect();
   const featuredProduct=await Product.findOne({}, null, { sort: { '_id': -1 } });
  // const featuredProduct=await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return{
    props:{
      featuredProduct:JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts))
    }
  }
}