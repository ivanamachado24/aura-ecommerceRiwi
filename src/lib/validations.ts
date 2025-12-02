import * as yup from 'yup';

export const registerSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio').min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const loginSchema = yup.object({
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const contactSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio').min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    message: yup.string().required('El mensaje es obligatorio').min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export const productSchema = yup.object({
    name: yup.string().required('El nombre del producto es obligatorio'),
    slug: yup.string().required('El slug es obligatorio'),
    description: yup.string().optional(), // Description is optional
    price: yup.number().required('El precio es obligatorio').positive('El precio debe ser positivo'),
    category: yup.string().required('La categoría es obligatoria').oneOf(['vestidos', 'croptops', 'jeans', 'conjuntos', 'faldas', 'accesorios'], 'Categoría no válida'),
    style: yup.string().required('El estilo es obligatorio').oneOf(['Elegante', 'Gótico', 'Coquette'], 'Estilo no válido'),
    sizes: yup.array().of(yup.string()).min(1, 'Debe haber al menos una talla'),
    stock: yup.number().integer('El stock debe ser un número entero').min(0, 'El stock no puede ser negativo').default(0),
    images: yup.array().of(yup.string().url('Debe ser una URL válida')).min(1, 'Debe haber al menos una imagen'),
    active: yup.boolean().default(true),
});

export const productFormSchema = yup.object({
    title: yup.string().required('El título es obligatorio'),
    description: yup.string().required('La descripción es obligatoria'),
    category: yup.string().required('La categoría es obligatoria'),
});
