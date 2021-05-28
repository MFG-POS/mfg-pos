import { Flex, Input, Select, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import {
  FilterColumn,
  FilterFunctionDefinition,
  filterFunctions,
  FilterOperator,
  filterOperators,
  FilterRuleDefinition,
} from 'model/table/table-filter-types';

type FilterRuleProps = {
  index: number;
  rule: FilterRuleDefinition;
  columns: FilterColumn[];
  updateRule: (rule: FilterRuleDefinition) => void;
  removeRule: (id: string) => void;
};

const FilterRule = ({ index, rule, columns, updateRule, removeRule }: FilterRuleProps) => (
  <Flex direction="row" mt={2} alignItems="center">
    {index > 0 && (
      <Select
        mr={2}
        maxW={20}
        value={rule.operator}
        onChange={(event) => updateRule({ ...rule, operator: event.target.value as FilterOperator })}
      >
        {filterOperators.map((operator) => (
          <option key={uuidv4()} value={operator.operator}>
            {operator.displayValue}
          </option>
        ))}
      </Select>
    )}

    <Text textTransform={index > 0 ? 'lowercase' : 'capitalize'} w={20}>
      Kolumna
    </Text>

    <Select
      mx={2}
      value={rule.columnAccessor}
      onChange={(event) => updateRule({ ...rule, columnAccessor: event.target.value })}
    >
      {columns.map((column) => (
        <option key={uuidv4()} value={column.accessor}>
          {column.name.toLowerCase()}
        </option>
      ))}
    </Select>

    <Select
      mr={2}
      value={rule.function.functionName}
      onChange={(event) =>
        updateRule({
          ...rule,
          function: filterFunctions.find(
            (ruleFunction) => ruleFunction.functionName === event.target.value,
          ) as FilterFunctionDefinition,
        })
      }
    >
      {filterFunctions.map((filterFunction) => (
        <option key={uuidv4()} value={filterFunction.functionName}>
          {filterFunction.displayValue}
        </option>
      ))}
    </Select>

    {!rule.function?.isIndependent && (
      <Input onChange={(event) => updateRule({ ...rule, value: event.target.value })} type="text" placeholder="" />
    )}

    <DeleteIcon onClick={() => removeRule(rule.id)} cursor="pointer" ml={2} w={6} h={6} />
  </Flex>
);

export default FilterRule;
