import { connectMongoose } from '../src/lib/mongodb';
import User from '../src/models/User';
import Product from '../src/models/Product';

async function run(){
  await connectMongoose();
  const admin = await User.findOneAndUpdate(
    { email: 'vanessa@aura.com' },
    { email: 'vanessa@aura.com', password: '$2b$12$NbOFEfIlbVtY8gSK2A5dY.56w/RSQj7eDIBjT5tBs9zR5Uh5DVAb6', role: 'admin', name: 'Vanessa Machado' },
    { upsert: true, new: true }
  );
  console.log('Admin creado:', admin.email);

  await Product.create([
    { name: 'Vestido Luna', slug:'vestido-luna', description:'Vestido elegante con brillo', price: 180000, category:'vestidos', style:'Elegante', sizes:['S','M','L'], images:['/logo.png'], stock:8 },
    { name: 'Crop Top Star', slug:'crop-star', description:'Crop top coqueto', price: 95000, category:'croptops', style:'Coquette', sizes:['S','M'], images:['/logo.png'], stock:15 },
    { name: 'Conjunto Noir', slug:'conjunto-noir', description:'Conjunto gótico con encaje', price: 210000, category:'conjuntos', style:'Gótico', sizes:['M','L'], images:['/logo.png'], stock:5 }
  ]);
  console.log('Productos seed creados');
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1) });
