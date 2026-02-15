/**
 * @author Luka Baturić
 * @date 15/02/2026
 */

import { Dispatch, SetStateAction, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddBookRequest from "../../models/AddBookRequest";

interface IReturn {
   title: string;
   setTitle: Dispatch<SetStateAction<string>>;
   author: string;
   setAuthor: Dispatch<SetStateAction<string>>;
   description: string;
   setDescription: Dispatch<SetStateAction<string>>;
   copies: number;
   setCopies: Dispatch<SetStateAction<number>>;
   category: string;
   setCategory: Dispatch<SetStateAction<string>>;
   displayWarning: boolean;
   displaySuccess: boolean;
   handleImageUpload: (file: File) => void;
   submitNewBook: () => Promise<void>;
}

const useManageBooks = (): IReturn => {
   const { isAuthenticated, getAccessTokenSilently } = useAuth0();

   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const [description, setDescription] = useState("");
   const [copies, setCopies] = useState(0);
   const [category, setCategory] = useState("Category");
   const [selectedImage, setSelectedImage] = useState<any>(null);
   const [displayWarning, setDisplayWarning] = useState(false);
   const [displaySuccess, setDisplaySuccess] = useState(false);

   const handleImageUpload = (file: File) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
         setSelectedImage(reader.result as string);
      };

      reader.onerror = (error) => {
         console.error("Image conversion error:", error);
      };
   };

   const submitNewBook = async () => {
      const url = `http://localhost:8080/api/admin/secure/add/book`;
      const accessToken = await getAccessTokenSilently();

      if (
         isAuthenticated &&
         title.trim() &&
         author.trim() &&
         category !== "Category" &&
         description.trim() &&
         copies >= 0
      ) {
         const book: AddBookRequest = new AddBookRequest(
            title,
            author,
            description,
            copies,
            category,
         );
         book.img = selectedImage;
         const requestOptions = {
            method: "POST",
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
         };

         const response = await fetch(url, requestOptions);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         setTitle("");
         setAuthor("");
         setDescription("");
         setCopies(0);
         setCategory("Category");
         setSelectedImage(null);
         setDisplayWarning(false);
         setDisplaySuccess(true);
      } else {
         setDisplayWarning(true);
         setDisplaySuccess(false);
      }
   };

   return {
      title,
      setTitle,
      author,
      setAuthor,
      description,
      setDescription,
      copies,
      setCopies,
      category,
      setCategory,
      displayWarning,
      displaySuccess,
      handleImageUpload,
      submitNewBook
   };
};

export { useManageBooks };
