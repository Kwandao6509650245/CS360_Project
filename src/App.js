import './App.css';
import Interface from './main/Interface';
import { useEffect, useState } from 'react';
import { PetProvider } from './contexts/PetContext';
import EditPetEntry from './components/EditPetEntry';


function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets');
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="App">
      <Interface pets={pets} /> { }
    </div>
  );
}

export default App;
