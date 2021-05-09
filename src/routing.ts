export type RouteCategories = 'Statystyki' | 'Menu' | 'Magazyn' | 'Dostęp' | 'Ustawienia';

export interface IRouteData {
  path: string;
  name: string;
}

export type Route<T> = {
  [P: string]: T;
};

export const ROUTE: Route<IRouteData> = { HOME: { path: '/', name: 'Strona główna' } };

export const ROUTE_STATS: Route<IRouteData> = {
  SALES: { path: '/statistics/sales', name: 'Sprzedaż' },
  CUSTOMERS: { path: '/statistics/customers', name: 'Klienci' },
  ABCANALYSIS: { path: `/statistics/abc-analysis/`, name: 'ABC Analiza' },
  PAYMENTS: { path: `/statistics/payments/`, name: 'Rodzaje płatności' },
  TAXES: { path: '/statistics/taxes/', name: 'Podatki' },
};

export const ROUTE_MENU: Route<IRouteData> = {
  PRODUCTS: { path: '/menu/products/', name: 'Artykuły' },
  DISHES: { path: '/menu/dishes/', name: 'Dania' },
  INGREDIENTS: { path: '/menu/ingredients/', name: 'Składniki' },
  CATEGORIES: { path: '/menu/categories/', name: 'Kategorie' },
};

export const ROUTE_MENU_FORMS: Route<IRouteData> = {
  PRODUCT: { path: '/menu/product-form', name: 'Wprowadź artykuł' },
  DISH: { path: '/menu/dish-form/', name: 'Wprowadź danie' },
  INGREDIENT: { path: '/menu/ingredient-form/', name: 'Wprowadź składnik' },
  CATEGORY: { path: '/menu/category-form/', name: 'Wprowadź kategorię' },
};

export const ROUTE_WAREHOUSE: Route<IRouteData> = {
  STOCK: { path: '/warehouse/stock/', name: 'Zapasy' },
  SUPPLIES: { path: '/warehouse/supplies', name: 'Dostawy' },
};

export const ROUTE_ACCESS: Route<IRouteData> = { EMPLOYEES: { path: '/access/employees', name: 'Pracownicy' } };

export const ROUTE_SETTINGS: Route<IRouteData> = {
  GENERAL: { path: '/settings/general', name: 'Ogólne' },
  BILLING: { path: '/settings/billing', name: 'Subskrypcja' },
  TABLES: { path: '/settings/tables', name: 'Stoliki' },
};
