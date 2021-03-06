import React, {FC} from 'react';
import {Box, Flex, Image, Text} from '@chakra-ui/react';

import placeHolderIcon from '../../../assets/icon/placeholderIcon.svg';

interface ItemsProps {
  alt: string;
  title: string;
  description: string;
  placeHolderImage?: string;
}

const Items: FC<ItemsProps> = ({placeHolderImage, alt, title, description}) => {
  return (
    <Flex align="center">
      <Image src={placeHolderImage} boxSize="49px" alt={alt} />

      <Box ml="10px">
        <Text size="18px" color="#000000" fontWeight="bold">
          {title}
        </Text>

        <Text size="16px" color="#666666" fontWeight="200">
          {description}
        </Text>
      </Box>
    </Flex>
  );
};

Items.defaultProps = {
  placeHolderImage: placeHolderIcon.src,
};

export default Items;
