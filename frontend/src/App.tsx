import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ImageToPdf from "./components/ImageToPdf";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ImageToPdf />} />
      </Route>
    </Routes>
  );
};
export default App;