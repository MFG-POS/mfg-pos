export const deleteCategoryHeader = 'Usuwanie kategorii';
export const deleteDishHeader = 'Usuwanie dania';
export const deleteProductHeader = 'Usuwanie artykułu';
export const deleteIngredientHeader = 'Usuwanie składnika';
export const deleteTaxHeader = 'Usuwanie podatku';

export const tableDeleteContent = (content: string) =>
  `Po wykonaniu tej akcji ${content} z systemu. Czy na pewno chcesz kontynować?`;
export const deleteCategoryContent = tableDeleteContent('wskazana kategoria zostanie bezpowrotnie usunięta');
export const deleteDishContent = tableDeleteContent('wskazane danie zostanie bezpowrotnie usunięte');
export const deleteProductContent = tableDeleteContent('wskazany artykuł zostanie bezpowrotnie usunięty');
export const deleteIngredientContent = tableDeleteContent('wskazany składnik zostanie bezpowrotnie usunięty');
export const deleteTaxContent = tableDeleteContent('wskazany podatek zostanie bezpowrotnie usunięty');
export const deleteEmployeeContent = tableDeleteContent('wskazany pracownik zostanie bezpowrotnie usunięty');

export const deleteCategoryToast = 'Kategoria została usunięta 🙌';
export const deleteDishToast = 'Danie zostało usunięte 🙌';
export const deleteProductToast = 'Artykuł został usunięty 🙌';
export const deleteIngredientToast = 'Składnik został usunięty 🙌';
export const deleteTaxToast = 'Podatek został usunięty 🙌';
