import { Outlet } from "react-router";

import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <section>
      {/* Header */}
      <Header />

      {/* Main */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </section>
  );
}

export default App;
