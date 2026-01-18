import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'profile';
  name?: string;
  image?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
  name = 'Budgetter',
  image,
  twitterCard = 'summary_large_image',
  structuredData,
  children,
}) => {
  const siteUrl = 'https://mybudgetter.netlify.app';
  const fullCanonical = canonical || siteUrl;
  const fullImage =
    image ||
    'https://res.cloudinary.com/budgettercloud/image/upload/v1723972092/logo-2_hrf3qi.png';

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Allow passing extra tags via children */}
      {children}
    </Helmet>
  );
};

export default SEO;
