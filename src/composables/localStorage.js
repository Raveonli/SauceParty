import { ref, watch } from "vue"; // Importation des fonctions "ref" et "watch" depuis la bibliothèque "vue"

// Fonction "useLocalStorage" pour gérer les données dans le stockage local
export function useLocalStorage(key, defaultValue = null) {
  let data = localStorage.getItem(key); // Récupération des données du stockage local avec la clé spécifiée

  if (data === null) {
    // Si les données n'existent pas dans le stockage local
    data = defaultValue; // Utilisation de la valeur par défaut spécifiée
    localStorage.setItem(key, JSON.stringify(data)); // Enregistrement des données dans le stockage local au moyen de la clé et en les transformant en une chaîne JSON
  } else {
    data = JSON.parse(data); // Si les données existent dans le stockage local, les convertir de la chaîne JSON en objet JavaScript
  }

  const value = ref(data); // Création d'une référence réactive avec les données récupérées ou la valeur par défaut

  watch(
    value,
    () => {
      // Utilisation de la fonction "watch" pour détecter les modifications de la référence réactive "value"
      localStorage.setItem(key, JSON.stringify(value.value)); // Lorsque la valeur de "value" change, mettre à jour les données correspondantes dans le stockage local en les convertissant en une chaîne JSON
    },
    { deep: true }
  ); // L'option "deep: true" permet de détecter les modifications profondes de la référence réactive (par exemple, si la référence contient un objet)

  return { value }; // Retourne un objet contenant la référence réactive "value"
}
