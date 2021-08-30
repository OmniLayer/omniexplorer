import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import getBlockchainName, { getLongName, getLayerName, getSiteDescriptor } from "utils/getBlockchainName";

const config = {
  shortSiteTitle: getLongName(),
  siteTitle: `The block explorer for ${getLayerName()} Tokens`,
  siteDescription: getSiteDescriptor(),
  siteImage: '/favicon.png',
  siteUrl: 'https://omniexplorer.info',
  pathPrefix: '',
  authorTwitterAccount: '@Omni_layer',
};
const FactoryLinkPreview = props => {
  const postTitle = props.title || '';
  const postDescription = props.description || '';
  const postCover = props.cover || '';
  const postSlug = props.slug || '';

  const title =
    postTitle !== '' ? `${postTitle} - ${config.siteTitle}` : config.siteTitle;
  const description =
    postDescription !== '' ? postDescription : config.siteDescription;
  const image = postCover !== '' ? postCover.resolutions.src : config.siteImage;
  const url = `${config.siteUrl + config.pathPrefix}/${postSlug}`;

  return (
    <Helmet>
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta name="og:url" content={url} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="og:type" content="website" />
      {/* <meta name="fb:app_id" content={facebook.appId} /> */}
      {/* Twitter Card tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={config.authorTwitterAccount || ''}
      />
    </Helmet>
  );
};

FactoryLinkPreview.propTypes = {
};

export default FactoryLinkPreview;
