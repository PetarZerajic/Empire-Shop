import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}
