import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Icon, Link } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link as RouterLink } from 'react-router-dom';
import { IRouteData, RouteCategories } from 'routing';

import { v4 as uuidv4 } from 'uuid';

type MenuAccordionProps = {
  title: RouteCategories;
  links: IRouteData[];
  icon: IconType;
};

const NavGroup = ({ title, links, icon }: MenuAccordionProps) => (
  <AccordionItem py="2" px="2">
    <h2>
      <AccordionButton px="3" py="4" _expanded={{ fontWeight: '700' }}>
        <Icon as={icon} mr="2" />
        <Box flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} as="ul" listStyleType="none">
      {Object.values(links).map((link) => (
        <Box pl="5" py="1" key={uuidv4()} as="li">
          <Link as={RouterLink} to={link.path} color="gray.500">
            {link.name}
          </Link>
        </Box>
      ))}
    </AccordionPanel>
  </AccordionItem>
);

export default NavGroup;
