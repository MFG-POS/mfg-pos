import Dashboard from 'views/Dashboard';
import CategoryForm from 'views/Menu/CategoryForm';
import Dishes from 'views/Menu/Dishes';
import DishForm from 'views/Menu/DishForm';
import IngredientForm from 'views/Menu/IngredientForm';
import ProductForm from 'views/Menu/ProductForm';
import Tables from 'views/Settings/Tables';
import Sales from 'views/Statistics/Sales';
import Taxes from 'views/Settings/Taxes';
import TaxesForm from 'views/Settings/TaxesForm';
import Stocks from 'views/Warehouse/Stocks';
import Supplies from 'views/Warehouse/Supplies';
import Products from 'views/Menu/Products';
import Categories from 'views/Menu/Categories';
import Ingredients from 'views/Menu/Ingredients';
import Order from 'views/Order/Order';
import Board from 'views/Order/Board';
import Users from 'views/Menu/Users';
import Login from 'auth/Login';
import UserForm from 'views/Menu/UserForm';

export const orderBoardPath = '/orders/board/';

export type RouteCategories = 'Zamówienia' | 'Statystyki' | 'Menu' | 'Magazyn' | 'Dostęp' | 'Ustawienia';

export interface IRouteData {
  path: string;
  name: string;
  readonly component: React.ReactNode;
  isExact?: boolean;
  isProtected?: boolean;
}

export type Route<T> = {
  [P: string]: T;
};

export const ROUTE: Route<IRouteData> = {
  DASHBOARD: { path: '/', name: 'Strona domowa', component: <Dashboard />, isExact: true },
  LOGIN: { path: '/login', name: 'Logowanie', component: <Login />, isExact: true },
};

export const ROUTE_BOARD: Route<IRouteData> = {
  BOARD: { path: orderBoardPath, name: 'Stoliki', component: <Board /> },
};

export const ROUTE_ORDERS: Route<IRouteData> = {
  ...ROUTE_BOARD,
  TERMINAL: { path: '/orders/:id/', name: 'Terminal', component: <Order /> },
};

export const ROUTE_STATS: Route<IRouteData> = {
  SALES: { path: '/statistics/sales/', name: 'Sprzedaż', component: <Sales />, isProtected: true },
  // TODO: Restore route after project submission
  // CUSTOMERS: { path: '/statistics/customers/', name: 'Klienci', component: <Customers /> },
  // ABCANALYSIS: { path: `/statistics/abc-analysis/`, name: 'ABC Analiza', component: <ABCAnalysis /> },
  // PAYMENTS: { path: `/statistics/payments/`, name: 'Rodzaje płatności', component: <Payments /> },
  // TAXES: { path: '/statistics/taxes/', name: 'Podatki', component: <TaxesStatistics /> },
};

export const ROUTE_MENU: Route<IRouteData> = {
  PRODUCTS: { path: '/menu/products/', name: 'Artykuły', component: <Products />, isProtected: true },
  DISHES: { path: '/menu/dishes/', name: 'Dania', component: <Dishes />, isProtected: true },
  INGREDIENTS: { path: '/menu/ingredients/', name: 'Składniki', component: <Ingredients />, isProtected: true },
  CATEGORIES: { path: '/menu/categories/', name: 'Kategorie', component: <Categories />, isProtected: true },
};

export const ROUTE_MENU_FORMS: Route<IRouteData> = {
  PRODUCT: { path: '/menu/product-form/', name: 'Wprowadź artykuł', component: <ProductForm />, isProtected: true },
  DISH: { path: '/menu/dish-form/', name: 'Wprowadź danie', component: <DishForm />, isProtected: true },
  INGREDIENT: {
    path: '/menu/ingredient-form/',
    name: 'Wprowadź składnik',
    component: <IngredientForm />,
    isProtected: true,
  },
  CATEGORY: {
    path: '/menu/category-form/',
    name: 'Wprowadź kategorię',
    component: <CategoryForm />,
    isProtected: true,
  },
};

export const ROUTE_WAREHOUSE: Route<IRouteData> = {
  STOCKS: { path: '/warehouse/stock/', name: 'Zapasy', component: <Stocks /> },
  SUPPLIES: { path: '/warehouse/supplies/', name: 'Dostawy', component: <Supplies /> },
};

export const ROUTE_ACCESS: Route<IRouteData> = {
  EMPLOYEES: { path: '/menu/accesses/', name: 'Pracownicy', component: <Users />, isProtected: true },
};

export const ROUTE_ACCESS_FORMS: Route<IRouteData> = {
  EMPLOYEES_FORM: { path: '/menu/accessform/', name: 'Users', component: <UserForm />, isProtected: true },
};

export const ROUTE_SETTINGS: Route<IRouteData> = {
  // TODO: Restore route after project submission
  // GENERAL: { path: '/settings/general/', name: 'Ogólne', component: <General /> },
  TAXES: { path: '/settings/taxes/', name: 'Podatki', component: <Taxes />, isProtected: true },
  // TODO: Restore route after project submission
  // BILLING: { path: '/settings/billing/', name: 'Subskrypcja', component: <Subscription /> },
  TABLES: { path: '/settings/tables/', name: 'Stoliki', component: <Tables />, isProtected: true },
};

export const ROUTE_SETTINGS_FORMS: Route<IRouteData> = {
  TAX: { path: '/settings/tax-form/', name: 'Wprowadź podatek', component: <TaxesForm />, isProtected: true },
};

export default Object.values({
  ...ROUTE,
  ...ROUTE_ORDERS,
  ...ROUTE_STATS,
  ...ROUTE_MENU,
  ...ROUTE_MENU_FORMS,
  ...ROUTE_WAREHOUSE,
  ...ROUTE_ACCESS,
  ...ROUTE_ACCESS_FORMS,
  ...ROUTE_SETTINGS,
  ...ROUTE_SETTINGS_FORMS,
}).map(({ path, component, isExact, isProtected }) => ({ path, component, isExact, isProtected }));
