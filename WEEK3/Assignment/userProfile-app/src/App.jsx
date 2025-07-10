
import ProfileCard from './components/profileCard';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-black dark:text-white relative">
      <DarkModeToggle />
      <ProfileCard
        name="Tina"
        image="https://i.pravatar.cc/150?img=32"
        bio="Web Developer and Tech Enthusiast"
        email="tina@example.com"
        location="Kerala, India"
      />
    </div>
  );
}

export default App;
