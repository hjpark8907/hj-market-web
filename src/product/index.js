import { useParams } from "react-router-dom";

function ProductPage() {
    const { id } = useParams();
    return <h1>useParams {id} product</h1>;

}

export default ProductPage;