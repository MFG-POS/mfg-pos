import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { TableInstance } from 'react-table';
import { BaseObject } from 'model/base-object';

function Paginator<T extends BaseObject>({
  gotoPage,
  canPreviousPage,
  previousPage,
  state,
  pageOptions,
  setPageSize,
  nextPage,
  canNextPage,
  pageCount,
}: TableInstance<T>) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      m={{ base: 0, lg: 4 }}
      mt={{ base: 4 }}
      flexWrap={{ base: 'wrap', lg: 'nowrap' }}
      flexDirection={{ base: 'row' }}
    >
      <Flex order={1}>
        <Tooltip label="Pierwsza strona">
          <IconButton
            aria-label="Pierwsza strona"
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={{ base: 2, lg: 4 }}
          />
        </Tooltip>
        <Tooltip label="Poprzednia strona">
          <IconButton
            aria-label="Poprzednia strona"
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
            mr={{ base: 4, lg: 0 }}
          />
        </Tooltip>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="center"
        order={{ base: 3, lg: 2 }}
        mt={{ base: 2, md: 0 }}
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
      >
        <Text mr={{ base: 2, lg: 8 }} minW={24}>
          Strona{' '}
          <Text fontWeight="bold" as="span">
            {state.pageIndex + 1}
          </Text>{' '}
          z{' '}
          <Text fontWeight="bold" as="span">
            {pageOptions.length}
          </Text>
        </Text>
        <Text minW={32}>Przejdź do strony:</Text>{' '}
        <NumberInput
          ml={2}
          mr={8}
          mt={{ base: 2, lg: 0 }}
          mb={{ base: 2, lg: 0 }}
          w={20}
          min={1}
          max={pageOptions.length}
          onChange={(value) => {
            const pageNumber = value ? Number(value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          defaultValue={state.pageIndex + 1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Select
          w={52}
          value={state.pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
          }}
        >
          {[1, 10, 20, 30, 40, 50].map((establishedSize) => (
            <option key={establishedSize} value={establishedSize}>
              Pokaż {establishedSize} elementów
            </option>
          ))}
        </Select>
      </Flex>

      <Flex order={{ base: 2, lg: 3 }}>
        <Tooltip label="Następna strona">
          <IconButton
            aria-label="Następna strona"
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Ostatnia strona">
          <IconButton
            aria-label="Ostatnia strona"
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={{ base: 2, lg: 4 }}
            mr={{ base: 4, lg: 0 }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Paginator;
