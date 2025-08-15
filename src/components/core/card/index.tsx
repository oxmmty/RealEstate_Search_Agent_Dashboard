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
      cover={
        <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <img
            src={item.image_url}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>}
      onClick={handleClick}
      className='h-full'
    >
      <div style={{  padding: '15px 15px'}}>
        
        <Title level={5} style={{marginTop: '10px', color: '#fffffff2'}}>{item.address}</Title>
        {item.damage_tags.map(tag => (
          <Tag color="#4782da" style={{fontSize: '14px', marginBottom: '5px'}}>{tag}</Tag>
        ))}
        {item.saletype_tags.map(tag => (
          <Tag color="#388e3c" style={{fontSize: '14px', marginBottom: '5px'}}>{tag}</Tag>
        ))}
        <Paragraph
          ellipsis={{ rows: 3, expandable: false }}
          style={{ marginTop: 8 }}
        >
          {item.description}
        </Paragraph>
      </div>
    </Card>
  )
};

export default MyCard;
