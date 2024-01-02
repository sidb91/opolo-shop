import React from "react";
import { Row, Col } from "react-bootstrap";

import { useGetProductsQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = (): React.JSX.Element => {

  const { data: products, isLoading, error } = useGetProductsQuery();

  // const [products, setProducts] = useState<IProduct[]>([]);

  // const fetchProducts = useCallback(async (): Promise<void> => {
  //   const {data} = await axios.get("/api/products");
  //   //console.log(data)
  //   setProducts(data);
  // },[])

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  if(isLoading){
    return <Loader />
  }

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg: string = 'error' in error ? error.error : JSON.stringify(error.data);

      return (
        <Message variant="danger">{errMsg}</Message>
      ) 
    } else {
        // you can access all properties of `SerializedError` here
        return <Message variant="danger">{error.message}</Message>
    }
  }
  

  if (products) {
    return (
      <>
        <h3>Product Details</h3>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>
      </>
    )
  }
  return null;
}

export default HomeScreen;
