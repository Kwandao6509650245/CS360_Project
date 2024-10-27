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
        const response = await fetch('/api/pets'); // URL ของ API
        const data = await response.json();
        setPets(data); // เก็บข้อมูลสัตว์เลี้ยงใน state
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets(); // เรียกใช้ฟังก์ชันดึงข้อมูล
  }, []); // ทำงานเมื่อ component mount

  return (
    <div className="App">
      <Interface pets={pets} /> {/* ส่งข้อมูลสัตว์เลี้ยงไปยัง Interface */}
    </div>
  );
}

export default App;
