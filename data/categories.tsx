type Category = {
  id: number;
  name: string;
  value: string;
  link: string;
  description: string;
  image: string;
};

type CategoryData = {
  categories: Category[];
};

const categories: CategoryData = {
  categories: [
    {
      id: 1,
      name: 'Electronics',
      value: 'electronics',
      link: 'Electronics',
      description: 'Smartphones, laptops, accessories',
      image:
        'https://static.vecteezy.com/system/resources/previews/022/716/501/non_2x/circuit-technology-background-with-hi-tech-digital-data-connection-system-and-computer-electronic-design-generat-ai-free-photo.jpg',
    },
    {
      id: 2,
      name: 'Clothing & Footwear',
      value: 'clothing & footwear',
      link: 'Clothing & Footwear',
      description: "Men's and women's clothing, shoes",
      image:
        'https://plus.unsplash.com/premium_photo-1670984222499-b566bf5cef69?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbiUyMHNob2VzfGVufDB8fDB8fHww',
    },
    {
      id: 3,
      name: 'Home Textiles',
      value: 'home textiles',
      link: 'Home Textiles',
      description: 'Blankets, pillows, towels',
      image:
        'https://media.istockphoto.com/id/940147664/photo/comfortable-pale-pink-upholstered-chair.jpg?s=612x612&w=0&k=20&c=OelwBSoI--K6xcAsW40UWzJoy90kFF9b0UJhXKZIMAI=',
    },
    {
      id: 4,
      name: 'Furniture',
      value: 'furniture',
      link: 'Furniture',
      description: 'Beds, tables, chairs, wardrobes',
      image:
        'https://img.freepik.com/free-photo/picture-frame-by-velvet-armchair_53876-132788.jpg?semt=ais_hybrid',
    },
    {
      id: 5,
      name: 'Kitchen Appliances',
      value: 'kitchen appliances',
      link: 'Kitchen Appliances',
      description: 'Mixers, kettles, toasters',
      image:
        'https://media.istockphoto.com/id/1211554164/photo/3d-render-of-home-appliances-collection-set.jpg?s=612x612&w=0&k=20&c=blm3IyPyZo5ElWLOjI-hFMG-NrKQ0G76JpWGyNttF8s=',
    },
    {
      id: 6,
      name: 'Toys',
      value: 'toys',
      link: 'Toys',
      description: 'Toys for children of all ages',
      image:
        'https://st4.depositphotos.com/4431055/31095/i/450/depositphotos_310956492-stock-illustration-cute-teddy-bear-bright-toys.jpg',
    },
    {
      id: 7,
      name: 'Cars',
      value: 'cars',
      link: 'Cars',
      description: 'Cars for all ages',
      image:
        'https://www.mad4wheels.com/img/free-car-images/mobile/17565/audi-rs7-sportback-2020-560181.jpg',
    },
    {
      id: 8,
      name: 'Beauty & Personal Care',
      value: 'beauty & personal care',
      link: 'Beauty',
      description: 'Cosmetics, skincare, haircare',
      image:
        'https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg',
    },
    {
      id: 9,
      name: 'Sports & Fitness',
      value: 'sports & fitness',
      link: 'Sports',
      description: 'Gym equipment, outdoor gear',
      image:
        'https://media.istockphoto.com/id/475559480/photo/female-soccer-superstar.jpg?s=612x612&w=0&k=20&c=i1u0jzfDa8v1IZ8RKU9Vh7raS1T0jNFxRFLMwCfj_7k=',
    },
    {
      id: 10,
      name: 'Books',
      value: 'books',
      link: 'Books',
      description: 'Fiction, non-fiction, educational books',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktoNpsu4s9DMHTtXkuuItwSp2ArmLW4YjdA&s',
    },
    {
      id: 11,
      name: 'Pet Supplies',
      value: 'pet supplies',
      link: 'Pet Supplies',
      description: 'Food, accessories, toys for pets',
      image:
        'https://media.istockphoto.com/id/1397603772/photo/flat-lay-with-accessories-for-dog-and-cat-on-white-wooden-background-pet-care.jpg?s=612x612&w=0&k=20&c=K9pY9xRYCHF_DHtJnuaEOI4I7LtV0XbCAefZkyU4sFw=',
    },
    {
      id: 12,
      name: 'Health & Wellness',
      value: 'health & wellness',
      link: 'Health & Wellness',
      description: 'Vitamins, supplements, healthcare products',
      image:
        'https://media.istockphoto.com/id/1459130410/vector/healthy-kids.jpg?s=612x612&w=0&k=20&c=3nLz49a_U4bB_ob6HziTBbsiJTrqYdGxUlLytRASdZs=',
    },
    {
      id: 13,
      name: 'Groceries',
      value: 'groceries',
      link: 'Groceries',
      description: 'Fresh food, packaged goods',
      image:
        'https://img.freepik.com/free-photo/top-view-assortment-vegetables-paper-bag_23-2148853335.jpg',
    },
  ],
};

export default categories;
