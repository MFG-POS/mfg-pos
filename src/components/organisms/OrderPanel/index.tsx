import { useEffect, useState } from 'react';
import { getAll } from 'api/firebase/firestore/firestore-actions';
import { CategoryRead as Category } from 'model/documents/category';
import { Dish } from 'model/documents/dish';
import { Flex } from '@chakra-ui/react';
import { isEmpty } from 'others/helper-functions';
import { Product } from 'model/documents/products';
import { isSummaryDocument, OrderDocument } from 'model/order/order-types';
import OrderBreadcrumb from 'components/molecules/Order/OrderBreadcrumb';
import OrderTilesGroup from 'components/atoms/OrderTilesGroup';
import { taxesAndCategories } from 'others/references';
import { categoriesOfProductsAndDishes, parentFilters } from 'api/firebase/firestore/firestore-filters';
import { DocumentFilter } from 'api/firebase/firebase.types';

type OrderPanelProps = {
  addSummaryItem: (document: OrderDocument) => void;
};

const OrderPanel = ({ addSummaryItem }: OrderPanelProps) => {
  const [breadcrumbState, setBreadcrumbState] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCategories();
    getDishes();
    getProducts();
  }, [breadcrumbState]);

  const getCategories = (): void => {
    const filters: DocumentFilter[] = [
      ...categoriesOfProductsAndDishes,
      ...parentFilters(
        'parent',
        'categories',
        isEmpty(breadcrumbState) ? null : breadcrumbState[breadcrumbState.length - 1].id,
      ),
    ];

    getAll<Category>('categories', [], filters)
      .then((documents) => setCategories(documents))
      .catch((error) => {
        throw new Error(`Could not fetch categories!. Error: ${error.message}`);
      });
  };

  const getDishes = (): void => {
    if (!isEmpty(breadcrumbState))
      getAll<Dish>(
        'dishes',
        taxesAndCategories,
        parentFilters('category', 'categories', breadcrumbState[breadcrumbState.length - 1].id),
      )
        .then((documents) => setDishes(documents))
        .catch((error) => {
          throw new Error(`Could not fetch dishes!. Error: ${error.message}`);
        });
  };

  const getProducts = (): void => {
    if (!isEmpty(breadcrumbState))
      getAll<Product>(
        'products',
        taxesAndCategories,
        parentFilters('category', 'categories', breadcrumbState[breadcrumbState.length - 1].id),
      )
        .then((documents) => setProducts(documents))
        .catch((error) => {
          throw new Error(`Could not fetch products!. Error: ${error.message}`);
        });
  };

  const onDocumentClick = (document: OrderDocument) =>
    isSummaryDocument(document)
      ? addSummaryItem(document)
      : setBreadcrumbState((previousState) => [...previousState, document]);

  const changeBreadcrumbState = (category: Category) => {
    const foundIndex = breadcrumbState.findIndex((stateCategory) => stateCategory.id === category.id);
    setBreadcrumbState((previousState) =>
      previousState.filter((_, stateCategoryIndex) => stateCategoryIndex <= foundIndex),
    );
  };

  const resetBreadcrumbState = () => {
    setBreadcrumbState([]);
    setDishes([]);
    setProducts([]);
  };

  return (
    <>
      <OrderBreadcrumb
        categories={breadcrumbState}
        resetState={resetBreadcrumbState}
        changeState={changeBreadcrumbState}
      />
      <Flex direction="column" minH="80vh">
        <OrderTilesGroup showDivider={false} documents={categories} onDocumentClick={onDocumentClick} />
        <OrderTilesGroup
          showDivider={!isEmpty(dishes) && !isEmpty(categories)}
          documents={dishes}
          onDocumentClick={onDocumentClick}
        />
        <OrderTilesGroup
          showDivider={!isEmpty(products) && (!isEmpty(dishes) || !isEmpty(categories))}
          documents={products}
          onDocumentClick={onDocumentClick}
        />
      </Flex>
    </>
  );
};

export default OrderPanel;
