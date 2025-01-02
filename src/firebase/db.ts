import { getFirestore, doc, collection, getDoc, getDocs, setDoc, addDoc, query, where } from "firebase/firestore"
import { app } from "./main"
import { ProductDisplayType } from "../utils/types/products";
import { OrderType } from "../utils/types/order";
import { ReviewType } from "../utils/types/review";

export const db = getFirestore(app);

export default async function getProductById(id: string) {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let productVariants = 0;

        const product = docSnap.data() as ProductDisplayType;

        product.options.map(option => {
            productVariants += option.attributes.length;
        })

        product.id = id;
        product.variantCount = productVariants;
        
        return product;
    } else {
        console.error("Could not reach products database!");
    }
}

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

export async function fetchTwoProducts() {
    try {
        let firstProduct: ProductDisplayType | null = null;
        let secondProduct: ProductDisplayType | null = null;

        const colRef = collection(db, "products");
        const colSnap = await getDocs(colRef);
        const ids = colSnap.docs.map(doc => doc.id);
    
        const firstRandomIndex = Math.floor(Math.random() * ids.length);
        let secondRandomIndex = Math.floor(Math.random() * ids.length);
        
        while (firstRandomIndex === secondRandomIndex) {
            secondRandomIndex = Math.floor(Math.random() * ids.length);
        }
    
        const firstItemId = ids[firstRandomIndex];
        const secondItemID = ids[secondRandomIndex];
    
        const firstDocRef = doc(db, "products", firstItemId);
        const secondDocRef = doc(db, "products", secondItemID);
    
        const doc1 = await getDoc(firstDocRef);
        const doc2 = await getDoc(secondDocRef);
    
        if (doc1.exists()) {
            firstProduct = doc1.data() as ProductDisplayType;
            firstProduct.id = firstItemId;
        }

        if (doc2.exists()) {
            secondProduct = doc2.data() as ProductDisplayType;
            secondProduct.id = secondItemID;
        }

        return [firstProduct, secondProduct];
      } catch (error) {
        console.error('Error fetching random documents:', error);
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

export async function placeOrder (order: OrderType) {
    const colRef = collection(db, "orders");

    try {
        await addDoc(colRef, order);
        return true;
    } catch (error: any) {
        console.error(error);
        return false;
    }
}

export async function createReview (review: ReviewType) {
    const colRef = collection(db, "reviews");
    try {
        await addDoc(colRef, review);
    } catch (error: any) {
        console.log(error);
    }
}

export async function getReviews (id: string) {
    let reviews: ReviewType[] = [];

    const colRef = collection(db, "reviews");
    const reviewQuery = query(colRef, where("productId", "==", id));
    const colSnap = await getDocs(reviewQuery);

    colSnap.forEach(el => {
        const reviewData = el.data();
        const review: ReviewType = {
            userId: reviewData.userId,
            userName: reviewData.userName,
            productId: reviewData.productId,
            description: reviewData.description,
            rating: reviewData.rating
        }

        reviews.push(review);
    })

    return reviews;
}