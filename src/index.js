import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Implémentez une véritable barre de navigation
  return <h1>React vous dit bonjour !</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);