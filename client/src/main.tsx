// Import necessary modules from React and React Router
//import { StrictMode } from "react";
//import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import additional components for new routes
// Try creating these components in the "pages" folder

import About from "./pages/About";
import Accueil from "./pages/Accueil";
import Administration from "./pages/Administration";
import Catalogue from "./pages/Catalogue";
import Cgv from "./pages/Cgv";
import Compte from "./pages/Compte";
import Contact from "./pages/Contact";
import Mentions from "./pages/Mentions";
import Panier from "./pages/Panier";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Administration",
        element: <Administration />,
      },
      {
        path: "/Catalogue",
        element: <Catalogue />,
      },
      {
        path: "/CGV",
        element: <Cgv />,
      },
      {
        path: "/Compte",
        element: <Compte />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Mentions",
        element: <Mentions />,
      },
      {
        path: "/Panier",
        element: <Panier />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
