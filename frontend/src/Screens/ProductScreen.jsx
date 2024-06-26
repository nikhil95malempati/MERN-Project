import React from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Ratings from "../Components/Ratings";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Message from "../Components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item> Price: ${product.price} </ListGroup.Item>
              <ListGroup.Item> Price: ${product.description} </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <Button
                    className="btn-block"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
