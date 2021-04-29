import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import MainPageComponent from "./main";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./product";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
function App() {
  //return <MainPageComponent />;
  const history = useHistory();
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/logo2.png" />
          </Link>
          <Button size="large"
            onClick={function () {
              history.push('/upload');
            }}
            icon={<DownloadOutlined />}>Upload items</Button>
        </div>
      </div>

      <div id="body">
        <Switch>
          <Route exact={true} path={"/"}>
            <MainPageComponent />
          </Route>
          <Route exact={true} path="/products/:id">
            <ProductPage />
          </Route>
          <Route exact={true} path="/upload">
            <UploadPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div >
  );
}

export default App;