import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { ThemeProvider, setDarkMode } from "./contextes/ThemeContext";
import "./App.css";

function AppContent() {
  const { theme } = setDarkMode();

  return (
    <section className={theme === "light" ? "text-base" : "text-2xl"}>
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
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
