import React, { useEffect, useState } from 'react';
import { FilterColumn, filterFunctions, FilterRuleDefinition } from 'model/table/table-filter-types';
import { v4 as uuidv4 } from 'uuid';
import PopoverTemplate from 'components/templates/PopoverTemplate';
import { Button, Flex, Text } from '@chakra-ui/react';
import FilterRule from 'components/molecules/Table/FilterRule';
import { AddIcon } from '@chakra-ui/icons';

type FilterProps = {
  columns: FilterColumn[];
  onFilter: (filterRules: FilterRuleDefinition[]) => void;
};

const Filter = ({ columns, onFilter }: FilterProps) => {
  const [filterRules, setFilterRules] = useState<FilterRuleDefinition[]>([]);

  const updateFilterRule = (rule: FilterRuleDefinition): void => {
    setFilterRules((previousRules) =>
      [...previousRules.filter((previousRule) => previousRule.id !== rule.id), rule].sort(
        (first, second) => first.index - second.index,
      ),
    );
  };

  const removeFilterRule = (id: string): void => {
    setFilterRules((previousRules) =>
      [...previousRules.filter((previousRule) => previousRule.id !== id)].sort(
        (first, second) => first.index - second.index,
      ),
    );
  };

  const addNewFilterRule = () => {
    setFilterRules((previousRules) => [
      ...previousRules,
      {
        id: uuidv4(),
        index: filterRules.length,
        value: '',
        columnName: columns[0].name,
        columnAccessor: columns[0].accessor,
        function: filterFunctions[0],
        ...(filterRules.length > 0 && { operator: '&&' }),
      },
    ]);
  };

  useEffect(() => onFilter(filterRules), [filterRules]);

  return (
    <PopoverTemplate
      variant="responsive"
      placement="right-end"
      header="Filtrowanie zaawansowane"
      triggerText="Filtruj"
      showFooter={true}
      footer={
        <Button mt="3" w="32" onClick={addNewFilterRule}>
          <AddIcon /> <Text ml="10px">Dodaj filtr</Text>
        </Button>
      }
      body={
        <Flex direction="column" mx="5px">
          {filterRules.map((filterRule, index) => (
            <FilterRule
              key={filterRule.id}
              index={index}
              columns={columns}
              rule={filterRule}
              removeRule={removeFilterRule}
              updateRule={updateFilterRule}
            />
          ))}
          {filterRules?.length === 0 && (
            <Text color="grey" fontSize="0.9rem">
              Użyj filtrowania do wyświetlenia interesujących grup obiektów.
              <br />
              Utwórz pierwszą regułę filtrowania klikając w przycisk poniżej.
            </Text>
          )}
        </Flex>
      }
    />
  );
};

export default Filter;
