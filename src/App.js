import { Route, Routes } from "react-router-dom";

import Test from "./pages/Test/Test";
import AdminLayout from "./layouts/AdminLayout";
import NewProduct from "./pages/productPage/NewProduct";
import ManageProduct from "./pages/productPage/ManageProduct";





function App() {

  return (
      <Routes>
        <Route path="/" element={<AdminLayout/>} >
          <Route path="" element={<Test/>} />
          <Route path ="/admin-dashboard/product/add" element={<NewProduct/>}/>
          <Route path ="/admin-dashboard/product/manage" element={<ManageProduct/>}/>
        </Route>
      </Routes>
  );
}

export default App;
