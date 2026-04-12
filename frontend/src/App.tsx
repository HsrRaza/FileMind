import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ImageToPdfPage from "./page/ImageToPdfPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ImageToPdfPage />} />
      </Route>
    </Routes>
  );
};
export default App;