import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Mail, MapPin, PhoneCall } from 'lucide-react';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Contact = () => {
  const position = [50.450001, 30.523333];

  if (typeof window !== 'undefined') {
    L.Marker.prototype.options.icon = DefaultIcon;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            If you have any questions or feedback, feel free to reach out to us!
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@myecommerce.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <PhoneCall className="h-6 w-6 text-blue-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (234) 567-890</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-blue-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">
                  123 E-commerce St, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 h-96">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup className="text-center">
                <strong>Our Office</strong> <br />
                😊 Feel free to visit us! <br />
                <small>123 E-commerce St</small>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
