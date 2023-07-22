import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { User } from "@/types/types";
import { doc, setDoc } from "firebase/firestore";
import { SavedYoutubeId } from "@/types/youtube";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: "mixine-45a45.firebaseapp.com",
  projectId: "mixine-45a45",
  storageBucket: "mixine-45a45.appspot.com",
  messagingSenderId: "874042522876",
  appId: "1:874042522876:web:af1d5e79da371d6a12eb79",
  measurementId: "G-1HHFE3ZYX5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const addUserToDb = (user: User) => {
  setDoc(doc(db, "Users", user!.id), user, {
    merge: true,
  });
};

export const saveSearchResult = (id: string, data: SavedYoutubeId) => {
  setDoc(doc(db, "YoutubeSearchResults", id), data, {
    merge: true,
  }).then(() => console.log("Successfully saved the search result"));
};
