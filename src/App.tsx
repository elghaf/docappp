import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { useRoutes } from "react-router-dom";

function App() {
  // Tempo routes
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {tempoRoutes}
        <Routes>
          <Route path="/" element={<Home />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
