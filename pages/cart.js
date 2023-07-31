import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  /*height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100px;
  } */
`;

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      if (cartProducts.length > 0) {
        const result = await axios.post("/api/cart", { ids: cartProducts });
        setProducts(result.data);
      }
    }
    getData();
  }, [cartProducts]);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <>
                <h2>Cart</h2>
                {products.map(({ _id, title }) => (
                  <div key={_id}>
                    {title}: {cartProducts.filter((id) => id === _id).length}
                  </div>
                ))}
              </>
            )}
          </Box>
          {cartProducts?.length > 0 && (
            <Box>
              <h2>Order informaion</h2>
              <input type="input" placeholder="Address" />
              <input type="input" placeholder="Address2" />
              <Button primary block>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}