export default function Categories() {
  const categories = [
    {
      image: 'https://images.pexels.com/photos/6069739/pexels-photo-6069739.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: '3D Printers'
    },
    {
      image: 'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Pasta, Noodle & Pizza Tools'
    },
    {
      image: 'https://images.pexels.com/photos/6069745/pexels-photo-6069745.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'SIM Tools'
    },
    {
      image: 'https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Screen Protectors'
    },
    {
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Oils'
    },
    {
      image: 'https://images.pexels.com/photos/4498153/pexels-photo-4498153.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Replacement'
    },
    {
      image: 'https://images.pexels.com/photos/6069748/pexels-photo-6069748.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Casserole Pots'
    },
    {
      image: 'https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Hoodies & Sweatshirts'
    },
    {
      image: 'https://images.pexels.com/photos/5705480/pexels-photo-5705480.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Toy Boxes & Organisers'
    },
    {
      image: 'https://images.pexels.com/photos/7210382/pexels-photo-7210382.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Dog & Cat Electric Clippers'
    },
    {
      image: 'https://images.pexels.com/photos/3201761/pexels-photo-3201761.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Dining Sets'
    },
    {
      image: 'https://images.pexels.com/photos/4226879/pexels-photo-4226879.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Microphones'
    },
    {
      image: 'https://images.pexels.com/photos/6589055/pexels-photo-6589055.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Leashes & Harnesses'
    },
    {
      image: 'https://images.pexels.com/photos/7619383/pexels-photo-7619383.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Scooters'
    },
    {
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Donate to Educate'
    },
    {
      image: 'https://images.pexels.com/photos/6069748/pexels-photo-6069748.jpeg?auto=compress&cs=tinysrgb&w=200',
      name: 'Equipment Bags'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>

        <div className="grid grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#F85606] transition-all cursor-pointer group"
            >
              <div className="w-20 h-20 mb-3 overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="text-xs text-center text-gray-700 font-medium leading-tight">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
