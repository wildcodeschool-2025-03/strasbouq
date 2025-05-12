import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./App.css";

function AppContent() {
  return (
    <section>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

function App() {
  return <AppContent />;
}

export default App;
