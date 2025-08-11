import React from 'react';
import { Card, Typography, Tag } from 'antd';

import { RealEstateItem } from '@/interface/data/home.interface';

type MyCardProps = {
  item: RealEstateItem;
  onClick?: (item: RealEstateItem) => void;
}

const MyCard: React.FC<MyCardProps> = ( { item, onClick } ) => {

  const { Title, Paragraph } = Typography;

  const handleClick = () => {
    onClick && onClick(item);
  }
  
  return (
    <Card
      hoverable
      cover={<img src={item.image_url} />}
      onClick={handleClick}
      className='h-full'
    >
      <Title level={5} style={{marginTop: '10px'}}>{item.address}</Title>
      {item.damage_tags.map(tag => (
        <Tag color="magenta" style={{fontSize: '14px', marginBottom: '5px'}}>{tag}</Tag>
      ))}
      {item.saletype_tags.map(tag => (
        <Tag color="processing" style={{fontSize: '14px', marginBottom: '5px'}}>{tag}</Tag>
      ))}
      <Paragraph
        ellipsis={{ rows: 3, expandable: false }}
        style={{ marginTop: 8 }}
      >
        {item.description}
      </Paragraph>
    </Card>
  )
};

export default MyCard;
