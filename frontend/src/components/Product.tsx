import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { IProduct } from "../interface/Product";

type ProductProps = {
  product: IProduct
}

const Product = ({ product }: ProductProps): React.JSX.Element => {
  return (
    <Card className="my-3 p-3 rounded bg-black text-white">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title text-white">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews `}
          />
        </Card.Text>

        <Card.Text as="div">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
