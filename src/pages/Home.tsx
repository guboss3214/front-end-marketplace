import { Link } from 'react-router-dom';
import backgroundVideo from '/video/background.mp4';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-6xl font-extrabold mb-8 drop-shadow-lg">
            Welcome to Our Marketplace
          </h1>
          <p className="text-2xl mb-8 drop-shadow-md">
            Discover amazing products and deals!
          </p>
          <Link
            to="/signup"
            className="px-8 py-4 text-lg text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>

        <div className="absolute inset-0 bg-black/50" />
      </div>
    </div>
  );
};

export default Home;
