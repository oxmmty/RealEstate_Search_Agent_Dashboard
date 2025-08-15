import type { DialogContentProps } from '@/types/props/dialog.type';

import { Divider, Image, Typography, Tag } from 'antd';
import React from 'react';

import { RealEstateItem } from '@/interface/data/home.interface';
import withDialog from '@/patterns/hoc/withDialog';


const RealEstateForm: React.FC<DialogContentProps<RealEstateItem, any>> = ({ data }) => {

  const { Title, Text, Link } = Typography;

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <a href={data.link} target="_blank">
          <Image
            src={data.image_url}
            preview={false}
            style={{borderRadius: '10px'}}
          />
        </a>
      </div>

      <Link href={data.link} target="_blank">
        <Title level={2} style={{color: '#fffffff2'}}>{data.address}</Title>
      </Link>
      <Title level={5}>{data.recommendation}</Title>
      {data.damage_tags.map(tag => (
        <Tag color="#4782da" style={{fontSize: '14px', marginBottom: '5px'}}>{tag}</Tag>
      ))}
      {data.saletype_tags.map(tag => (
        <Tag color="#388e3c" style={{fontSize: '14px', marginBottom: '5px'}}>{tag}</Tag>
      ))}

      <Divider />
      <Title level={3}>About this home</Title>
      <Title level={4} style={{marginTop: '5px'}}>Price: $ {data.price}{data.beds ? ', Beds: '+data.beds : ''}{data.baths ? ', Baths: '+data.baths : ''}{data.space != '' ? ', '+data.space : ''}</Title>
      <Title level={5}>{data.description}</Title>

      <div style={{display: 'flex', justifyContent: 'end'}}>
        <Link href={data.link} target="_blank">
          See more details...
        </Link>
      </div>
    </>
  )
}

export default withDialog(RealEstateForm);
