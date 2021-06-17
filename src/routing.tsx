import Employees from 'views/Access/Employees';
import Dashboard from 'views/Dashboard';
import CategoryForm from 'views/Menu/CategoryForm';
import Dishes from 'views/Menu/Dishes';
import DishForm from 'views/Menu/DishForm';
import IngredientForm from 'views/Menu/IngredientForm';
import ProductForm from 'views/Menu/ProductForm';
import General from 'views/Settings/General';
import Subscription from 'views/Settings/Subscription';
import Tables from 'views/Settings/Tables';
import ABCAnalysis from 'views/Statistics/ABCAnalysis';
import Customers from 'views/Statistics/Customers';
import Payments from 'views/Statistics/Payments';
import Sales from 'views/Statistics/Sales';
import Taxes from 'views/Statistics/Taxes';
import Stocks from 'views/Warehouse/Stocks';
import Supplies from 'views/Warehouse/Supplies';
import Products from 'views/Menu/Products';
import Categories from 'views/Menu/Categories';
import Ingredients from 'views/Menu/Ingredients';
import Order from 'views/Order/Order';

export type RouteCategories = 'Zamówienia' | 'Statystyki' | 'Menu' | 'Magazyn' | 'Dostęp' | 'Ustawienia';

export interface IRouteData {
  path: string;
  name: string;
  readonly component: React.ReactNode;
  isExact?: boolean;
}

export type Route<T> = {
  [P: string]: T;
};

export const ROUTE: Route<IRouteData> = {
  HOME: { path: '/', name: 'Strona główna', component: <Dashboard />, isExact: true },
};

export const ROUTE_ORDERS: Route<IRouteData> = {
  TERMINAL: { path: '/orders/terminal/', name: 'Terminal', component: <Order /> },
};

export const ROUTE_STATS: Route<IRouteData> = {
  SALES: { path: '/statistics/sales/', name: 'Sprzedaż', component: <Sales /> },
  CUSTOMERS: { path: '/statistics/customers/', name: 'Klienci', component: <Customers /> },
  ABCANALYSIS: { path: `/statistics/abc-analysis/`, name: 'ABC Analiza', component: <ABCAnalysis /> },
  PAYMENTS: { path: `/statistics/payments/`, name: 'Rodzaje płatności', component: <Payments /> },
  TAXES: { path: '/statistics/taxes/', name: 'Podatki', component: <Taxes /> },
};

export const ROUTE_MENU: Route<IRouteData> = {
  PRODUCTS: { path: '/menu/products/', name: 'Artykuły', component: <Products /> },
  DISHES: { path: '/menu/dishes/', name: 'Dania', component: <Dishes /> },
  INGREDIENTS: { path: '/menu/ingredients/', name: 'Składniki', component: <Ingredients /> },
  CATEGORIES: { path: '/menu/categories/', name: 'Kategorie', component: <Categories /> },
};

export const ROUTE_MENU_FORMS: Route<IRouteData> = {
  PRODUCT: { path: '/menu/product-form/', name: 'Wprowadź artykuł', component: <ProductForm /> },
  DISH: { path: '/menu/dish-form/', name: 'Wprowadź danie', component: <DishForm /> },
  INGREDIENT: { path: '/menu/ingredient-form/', name: 'Wprowadź składnik', component: <IngredientForm /> },
  CATEGORY: { path: '/menu/category-form/', name: 'Wprowadź kategorię', component: <CategoryForm /> },
};

export const ROUTE_WAREHOUSE: Route<IRouteData> = {
  STOCKS: { path: '/warehouse/stock/', name: 'Zapasy', component: <Stocks /> },
  SUPPLIES: { path: '/warehouse/supplies/', name: 'Dostawy', component: <Supplies /> },
};

export const ROUTE_ACCESS: Route<IRouteData> = {
  EMPLOYEES: { path: '/access/employees/', name: 'Pracownicy', component: <Employees /> },
};

export const ROUTE_SETTINGS: Route<IRouteData> = {
  GENERAL: { path: '/settings/general/', name: 'Ogólne', component: <General /> },
  BILLING: { path: '/settings/billing/', name: 'Subskrypcja', component: <Subscription /> },
  TABLES: { path: '/settings/tables/', name: 'Stoliki', component: <Tables /> },
};

export default Object.values({
  ...ROUTE,
  ...ROUTE_ORDERS,
  ...ROUTE_STATS,
  ...ROUTE_MENU,
  ...ROUTE_MENU_FORMS,
  ...ROUTE_WAREHOUSE,
  ...ROUTE_ACCESS,
  ...ROUTE_SETTINGS,
}).map(({ path, component, isExact }) => ({ path, component, isExact }));
