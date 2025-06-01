// pages/NewsletterUpload.tsx
import CodeEditor from '@/components/admin/NewsLetter/CodeEditor';
import PreviewBox from '@/components/admin/NewsLetter/PreviewBox';
import UploadForm from '@/components/admin/NewsLetter/UploadForm';
import { Button } from '@/components/ui/button';
import { SendNewsletter } from '@/services/adminAccess';
import { useMutation } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const NewsletterUpload: React.FC = () => {
  const [heading, setHeading] = useState('');
  const [usersEmails, setUsersEmails] = useState<string[]>([]);
  const [fileContent, setFileContent] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const html = reader.result as string;
      setFileContent(html);
      setEditorContent(html);
    };
    reader.readAsText(file);
  };

  const handlePreviewClick = () => {
    setShowEditor(!showEditor);
  };

  const { mutateAsync: sendNewsLetterToUsersMutate } = useMutation({
    mutationFn: SendNewsletter,
    onSuccess: () => {
      console.log('Newsletter Sent Successfully!!');
    },
    onError: (err: any) => {
      console.log(err.message);
    },
  });

  const handleSendNewsLetter = () => {
    if (
      !editorContent.toLowerCase().includes('<!doctype html>') &&
      !editorContent.toLowerCase().startsWith('<html')
    ) {
      toast.error('Provide Valid HTML Newsletter Content!!');
      return;
    }
    if (heading.length <= 5) {
      toast.error('Please Enter Newsletter Subject!!');
      return;
    }
    if (usersEmails.length === 0) {
      toast.error('Please Add Recipients!!');
      return;
    }
    toast.promise(
      sendNewsLetterToUsersMutate({
        subject: heading,
        emails: usersEmails,
        html: editorContent,
      }),
      {
        loading: 'Sending Newsletter to Users......',
        success: <span>Newsletter Sent Successfully!!</span>,
        error: <span>Something went wrong!!</span>,
      }
    );
  };

  return (
    <div className="grid w-full grid-cols-12 gap-6 rounded-md border border-border_light bg-bg_primary_light p-6 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      {/* Left Side */}
      <div className="col-span-12 space-y-4 lg:col-span-6">
        <h2 className="text-center text-lg font-semibold md:text-left">
          Upload Newsletter
        </h2>
        <UploadForm
          heading={heading}
          setHeading={setHeading}
          onFileChange={handleFileChange}
          onTogglePreviewClick={handlePreviewClick}
          showEditor={showEditor}
          setUsersEmails={setUsersEmails}
        />
        {showEditor && fileContent && (
          <CodeEditor
            htmlContent={editorContent}
            onChange={(val) => setEditorContent(val || '')}
          />
        )}
        <div className="send_button flex w-full justify-end">
          <Button
            onClick={handleSendNewsLetter}
            className="flex max-w-fit items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 px-7 py-1.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br hover:opacity-90"
          >
            <span>Send NewsLetter</span>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 lg:col-span-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
          Preview: {heading || 'Untitled Newsletter'}
        </h2>
        <PreviewBox htmlContent={editorContent} />
      </div>
    </div>
  );
};

export default NewsletterUpload;
