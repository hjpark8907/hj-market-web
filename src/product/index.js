import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"
import { API_URL } from "../config/constants";
import dayjs from 'dayjs';
import { Button, message } from "antd";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const getProduct = () => {
        axios.get(`${API_URL}/products/${id}`)
            .then(
                function (result) {
                    setProduct(result.data.product);
                })
            .catch(function (error) {
                console.error(error);
            });
    }

    useEffect(function () {
        getProduct();
    }, [])

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
                <pre id="description">{product.description}</pre>
            </div>
        </div>
    )
}

export default ProductPage;