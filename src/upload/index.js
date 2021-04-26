import "./index.css";
import { Button, Form, Divider, Input, InputNumber, Upload, message } from 'antd';
import useSelection from "antd/lib/table/hooks/useSelection";
import { useState } from "react";
import { API_URL } from "../config/constants";
import axios from 'axios';
import { useHistory } from "react-router-dom";

function UploadPage() {
    const [imageUrl, setImageUrl] = useState(null);
    const history = useHistory();
    const onSubmit = (values) => {
        axios.post(`${API_URL}/products`, {
            name: values.name,
            description: values.description,
            seller: values.seller,
            price: parseInt(values.price),
            imageUrl: imageUrl
        }).then((result) => {
            console.log(result);
            history.replace('/');
        }).catch((error) => {
            console.error(error);
            message.error(`error happens!. ${error.message}`);
        })
    }

    const onChangeImage = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl);
        }
    }
    return (
        <div id="upload-container">
            <Form name="Item Upload" onFinish={onSubmit}>
                <Form.Item name="upload" label={<div className="upload-label">
                    Picture</div>}>
                    <Upload name="image"
                        action={`${API_URL}/image`}
                        listType="picture"
                        showUploadList={false}
                        onChange={onChangeImage}>
                        {
                            imageUrl ? (<img id="upload-image" src={`${API_URL}/${imageUrl}`} />)
                                :
                                (
                                    <div id="upload-img-placeholder">
                                        <img src="/images/icons/camera.png" />
                                        <span>plz upload images.</span>
                                    </div>

                                )
                        }

                    </Upload>
                </Form.Item>
                <Divider />
                <Form.Item
                    label={<div className="upload-label">Seller</div>}
                    name="seller"
                    rules={[{ required: true, message: "plz input seller's name!" }]}
                >
                    <Input
                        className="upload-name"
                        size="large"
                        placeholder="plz input name." />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="name"
                    label={<div className="upload-label">Product</div>}
                    rules={[{ required: true, message: "plz input product's name!" }]}
                >
                    <Input
                        className="upload-name"
                        size="large"
                        placeholder="Plz input product's name." />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="price"
                    label={<div className="upload-label">Price</div>}
                    rules={[{ required: true, message: "Plz input product's price!" }]}
                >
                    <InputNumber defaultValue={0} className="upload-price" size="large" />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="description"
                    label={<div className="upload-label">Description</div>}
                    rules={[{ required: true, message: "plz input product's description!" }]}
                >
                    <Input.TextArea
                        size="large"
                        id="product-description"
                        showCount
                        maxLength={300}
                        placeholder="plz input product's description!" />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" size="large" htmlType="submit">
                        Enroll

                    </Button>
                </Form.Item>

            </Form>
        </div >
    )
}

export default UploadPage;