import React from 'react';
import "./index.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants.js";

dayjs.extend(relativeTime);

function MainPage() {
    const [products, setProducts] = React.useState([]);
    React.useEffect(
        function () {
            axios.get(
                `${API_URL}/products`
            )
                .then(function (result) {
                    const products = result.data.products;
                    setProducts(products);
                })
                .catch(function (error) {
                    console.log('error happens : ', error);
                });
        }
        , []);
    return (
        <div>
            <div id="banner">
                <img src="images/banners/banner3.png" />
            </div>
            <h1 id="product-headline">Items for sale</h1>
            <div id="product-list">
                {
                    products.map(function (product, index) {
                        return (
                            <div className="product-card">
                                <Link className="product-link" to={`/products/${product.id}`}>
                                    <div>
                                        <img className="product-img" src={`${API_URL}/${product.imageUrl}`} />
                                    </div>
                                    <div className="product-contents">
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-price">{product.price} won</span>
                                        <div className="product-footer">
                                            <div className="product-seller">
                                                <img className="product-avatar" src="images/icons/avatar.png" />
                                                <span>{product.seller}</span>
                                            </div>
                                            <span className="product-data">{dayjs(product.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MainPage;
