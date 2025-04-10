import { Link } from 'react-router-dom';
import backgroundVideo from '/video/background.mp4';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full min-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster=""
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 lg:mb-8 drop-shadow-lg leading-tight">
            Welcome to Our Marketplace
          </h1>
          <p className="text-xl sm:text-2xl mb-6 sm:mb-8 drop-shadow-md max-w-2xl mx-auto">
            Discover amazing products and deals!
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg lg:text-xl text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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
