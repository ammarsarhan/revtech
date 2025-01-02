import { getFirestore, doc, collection, getDoc, getDocs, setDoc } from "firebase/firestore"
import { app } from "./main"
import { ProductDisplayType } from "../utils/types/products";

export const db = getFirestore(app);

export async function getProducts() {
    let products: ProductDisplayType[] = [];
    
    const colRef = collection(db, "products");
    const colSnap = await getDocs(colRef);
    
    colSnap.forEach(doc => {
        const productId = doc.id;
        const productData = doc.data();

        let productVariants = 0;

        productData.options.map(option => {
            productVariants += option.attributes.length;
        })

        const product: ProductDisplayType = {
            id: productId,
            name: productData.name,
            vendor: productData.vendor,
            shortDescription: productData.shortDescription,
            longDescription: productData.longDescription,
            category: productData.category,
            imageSource: productData.imageSource,
            price: productData.price,
            feature: productData.feature,
            options: productData.options,
            variantCount: productVariants,
            inWishlist: false
        }

        products.push(product);
    });

    return products;
}

export default async function getProductById(id: string) {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const product = docSnap.data() as ProductDisplayType;
        product.id = id;
        
        return product;
    } else {
        console.error("Could not reach products database!");
    }
}

export async function addProduct(product: ProductDisplayType, id: string): Promise<void> {
    const docRef = doc(db, "products", id);

    try {
        await setDoc(docRef, {
            name: product.name,
            vendor: product.vendor,
            shortDescription: product.shortDescription,
            longDescription: product.longDescription,
            category: product.category,
            imageSource: product.imageSource,
            price: product.price,
            feature: product.feature,
            options: product.options,
        });

        console.log(`Document created with custom ID: ${id}`);
    } catch (error) {
        console.error("Error adding document with custom ID: ", error);
    }
}