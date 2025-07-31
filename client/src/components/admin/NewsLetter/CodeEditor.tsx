import React, { useEffect, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

interface CodeEditorProps {
  htmlContent: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ htmlContent, onChange }) => {
  const monaco = useMonaco();
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    if (monaco && !themeReady) {
      monaco.editor.defineTheme('winter-is-coming', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '5A9BCF' },
          { token: 'keyword', foreground: 'C586C0' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'DCDC8D' },
        ],
        colors: {
          'editor.background': '#1E1E3F',
          'editor.foreground': '#FFFFFF',
          'editorLineNumber.foreground': '#858585',
          'editorLineNumber.activeForeground': '#C586C0',
        },
      });
      monaco.editor.setTheme('winter-is-coming');
      setThemeReady(true);
    }
  }, [monaco, themeReady]);

  return (
    <div className="mt-3 h-[400px] overflow-hidden rounded-md">
      <Editor
        height="100%"
        defaultLanguage="html"
        value={htmlContent}
        onChange={onChange}
        theme={themeReady ? 'winter-is-coming' : 'vs-dark'} // fallback
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          padding: { top: 10 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
