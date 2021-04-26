import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"
import { API_URL } from "../config/constants";
import dayjs from 'dayjs';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(function () {
        axios.get(`${API_URL}/products/${id}`)
            .then(
                function (result) {
                    setProduct(result.data.product);
                })
            .catch(function (error) {
                console.error(error);
            });
    }, [])

    if (product === null) {
        return <h1>product information gathering..</h1>
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
                <pre id="description">{product.description}</pre>
            </div>
        </div>
    )
}

export default ProductPage;