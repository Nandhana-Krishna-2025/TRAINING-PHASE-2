import Card from './components/Card';
import cardsData from './components/cardData';


function App() {
  return (
    <div className="min-h-screen bg-gradient-neutral py-10 px-4 ">
      <div className="w-fit mx-auto mb-10 px-6 py-3 bg-gray-100 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 ease-in-out">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Shoe Store
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
        {cardsData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}


export default App;


