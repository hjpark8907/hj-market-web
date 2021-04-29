import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"
import { API_URL } from "../config/constants";
import dayjs from 'dayjs';
import { Button, message } from "antd";
import ProductCard from '../components/productCard';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const getProduct = () => {
        axios.get(`${API_URL}/products/${id}`)
            .then(
                (result) => {
                    setProduct(result.data.product);
                })
            .catch((error) => {
                console.error(error);
            });
    }

    const getRecommendations = () => {
        axios
            .get(`${API_URL}/products/${id}/recommendation`)
            .then((result) => {
                setProducts(result.data.products);
                console.log(result.data.products);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getProduct();
        getRecommendations();
    }, [id])

    if (product === null) {
        return <h1>product information gathering..</h1>
    }

    const onClickPurchase = () => {
        axios.post(`${API_URL}/purchase/${id}`)
            .then((result) => {
                message.info("Buy complete!")
                getProduct();
            }).catch((error) => {
                message.error(`error happnes!! ${error}`)
            })
    }
    return (
        <div>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}won</div>
                <div id="createdAt">{dayjs(product.createdAt).format('DD/MM/YYYY')}</div>
                <Button
                    id="purchase-button"
                    size="large"
                    type="primary"
                    danger
                    onClick={onClickPurchase}
                    disabled={product.soldout === 1}>Buy</Button>
                <div id="description-box">
                    <pre id="description">{product.description}</pre>
                </div>
                <div>
                    <h1>Recommended products</h1>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {products.map((product, index) => {
                            return <ProductCard key={index} product={product} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;