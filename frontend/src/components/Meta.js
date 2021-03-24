import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>CocoBowls | {title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'CocoBowls',
  description: 'We sell best quality wooden products for best prices',
  keywords: 'cutlery, wood, wooden, coconut, bamboo, eco',
};

export default Meta;
