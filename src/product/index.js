import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"
function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(function () {
        axios.get(`https://6683a955-ec5e-4bc2-9a98-06f1f79c4b5c.mock.pstmn.io/products/${id}`)
            .then(
                function (result) {
                    setProduct(result.data);
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
                <img src={"/" + product.imageUrl} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}won</div>
                <div id="createdAt">2021.04.23</div>
                <div id="description">{product.description}</div>
            </div>
        </div>
    )
}

export default ProductPage;