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
import { CommonDocument } from 'model/documents/common';

function Paginator<T extends CommonDocument>({
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
    <Flex justifyContent="space-between" alignItems="center" mt="4" flexWrap="wrap" flexDirection="row">
      <Flex>
        <Tooltip label="Pierwsza strona">
          <IconButton
            aria-label="Pierwsza strona"
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h="3" w="3" />}
            mr="2"
          />
        </Tooltip>
        <Tooltip label="Poprzednia strona">
          <IconButton
            aria-label="Poprzednia strona"
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h="6" w="6" />}
            mr="4"
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center" justifyContent="center" mt="2" flexWrap="wrap">
        <Text mr="2" minW="24">
          Strona{' '}
          <Text fontWeight="bold" as="span">
            {state.pageIndex + 1}
          </Text>{' '}
          z{' '}
          <Text fontWeight="bold" as="span">
            {pageOptions.length}
          </Text>
        </Text>
        <Text minW="32">Przejdź do strony:</Text>{' '}
        <NumberInput
          ml="2"
          mr="8"
          mt="2"
          w="20"
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
          w="52"
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

      <Flex>
        <Tooltip label="Następna strona">
          <IconButton
            aria-label="Następna strona"
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h="6" w="6" />}
          />
        </Tooltip>
        <Tooltip label="Ostatnia strona">
          <IconButton
            aria-label="Ostatnia strona"
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h="3" w="3" />}
            ml="2"
            mr="4"
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Paginator;
