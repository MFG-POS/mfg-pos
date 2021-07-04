import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Category } from 'model/documents/category';

type OrderBreadcrumbProps = {
  categories: Category[];
  resetState: () => void;
  changeState: (category: Category) => void;
};

const OrderBreadcrumb = ({ categories, resetState, changeState }: OrderBreadcrumbProps) => (
  <Breadcrumb
    mt="5"
    mb="3"
    p="3"
    spacing="0.5rem"
    borderWidth="1px"
    borderRadius="12px"
    bg="white"
    separator={<ChevronRightIcon color="gray.500" />}
  >
    <BreadcrumbItem key="Kategorie główne">
      <BreadcrumbLink onClick={resetState}>Kategorie główne</BreadcrumbLink>
    </BreadcrumbItem>
    {categories.map((category) => (
      <BreadcrumbItem key={category.id}>
        <BreadcrumbLink onClick={() => changeState(category)}>{category.name}</BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
);

export default OrderBreadcrumb;
