import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./App.css";

function AppContent() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <section>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </section>
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
