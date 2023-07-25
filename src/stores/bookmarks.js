import { ref } from "vue"; // Importation de la fonction "ref" depuis la bibliothèque "vue"
import { useLocalStorage } from "../composables/localStorage.js"; // Importation de la fonction "useLocalStorage" depuis le fichier "../composables/localStorage.js"

// Utilisation de la fonction "useLocalStorage" pour créer une référence réactive appelée "bookmarks"
export const { value: bookmarks } = useLocalStorage("bookmarks", []);
export const { value: favoriteBookmark } = useLocalStorage(
  "favoriteBookmark",
  []
);

export function addTofav(fav) {
  if (fav.label.length === 0) {
    throw new Error("Fav must be not empty");
  }
  favoriteBookmark.value.push(fav);
}
// Fonction "add" pour ajouter un signet
export function add(bookmark) {
  // Validation du signet
  // Le label doit être une chaîne de caractères et ne doit pas être vide
  if (typeof bookmark.label !== "string" || bookmark.label.length === 0) {
    throw new Error("Bookmark label must be a string and is not empty");
  }

  bookmarks.value.push(bookmark); // Ajout du signet à la liste des signets
}

// Fonction "remove" pour supprimer un signet
export function remove(bookmark) {
  const index = bookmarks.value.indexOf(bookmark); // Recherche de l'index du signet dans la liste des signets
  bookmarks.value.splice(index, 1); // Suppression du signet à l'index spécifié
}

// Fonction "update" pour mettre à jour un signet
export function update(bookmark, newBookmark) {
  const index = bookmarks.value.indexOf(bookmark); // Recherche de l'index du signet dans la liste des signets
  bookmarks.value.splice(index, 1, newBookmark); // Remplacement du signet à l'index spécifié par le nouveau signet
}
