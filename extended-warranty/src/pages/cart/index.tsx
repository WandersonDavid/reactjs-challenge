import { Box, Button, Card, Container, List, Typography, styled } from "@mui/material";
import { useShoppingCart } from "../../context/context";
import { ListProductCart } from "../../components/ListProductCart";
import { Product } from "../../types/produts";

type Select = {
  [key: string]: (product: Product) => void;
}

export const Cart = () => {
  const { cart, addProduct, removeProduct, extendedWarranty } = useShoppingCart();

  const handleCart = (product: Product, type: string) => {
    const select: Select = {
      'add': addProduct,
      'remove': (product: Product) => removeProduct(product.id),
    }
    return select[type] && select[type](product);
  }


  const handleWarranty = (id: number, value: number) => {
    extendedWarranty(id, value)
  }

  return (
    <Container sx={{
      height: 'fit-content',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '150px',
      padding: '16px',
      gap: '16px',
    }}>
      {!Object.entries(cart).length && <Box sx={{ width: '100%' }}>
        <Typography sx={{ width: '100%', textAlign: 'center' }}>Carrinho Vazio</Typography>
      </Box>}
      {!!Object.entries(cart).length && <Box sx={{ width: '100%', background: `red` }}>
        <Card sx={{ width: '100%' }}>
          <Typography sx={{ width: '100%', textAlign: 'center' }}>Seus Produtos</Typography>
          {Object.entries(cart).map(([key, value]) => (
            <ListProductCart id={value.id} key={key} title={value.title} price={value.price} amount={value.amount} image={value.image} onChange={handleCart} onChangeWarranty={handleWarranty} extraWarranty={value.extraWarranty} />
          ))}
        </Card>
      </Box>
      }

      {!!Object.entries(cart).length && <Box>
        <Card sx={{ width: '300px', padding: '8px',height: 'fit-content',  }}>
          <Typography sx={{ width: '100%', textAlign: 'center' }}>Resumo</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ width: '100%', textAlign: 'left' }}>Total:</Typography>
            <Typography sx={{ width: '100%', textAlign: 'right' }}>R$ {Object.entries(cart).reduce((acc, [key, value]) => acc + (value.price * value.amount), 0)}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ width: '100%', textAlign: 'left' }}>Total com garantia extendida:</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ width: '100%', textAlign: 'left' }}>Sub Total:</Typography>
          </Box>


          <Button variant="contained" sx={{width: '100%', marginBottom: '10px'}}>
            Continuar Comprando
          </Button>
          <Button variant="contained" sx={{width: '100%'}}>
            Finalizar Compra
          </Button>
        </Card>
      </Box>}
    </Container >
  )
}