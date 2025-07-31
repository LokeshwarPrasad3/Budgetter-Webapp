import React, { useEffect, useRef } from 'react';

interface PreviewBoxProps {
  htmlContent: string;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      if (document) {
        document.open();
        document.write(htmlContent);
        document.close();
      }
    }
  }, [htmlContent]);

  return (
    <div className="h-[600px] overflow-hidden rounded-md bg-white shadow-sm">
      <iframe
        ref={iframeRef}
        title="Newsletter Preview"
        className="h-full w-full border-0 bg-transparent"
      />
    </div>
  );
};

export default PreviewBox;
