'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import EditorLoader from '@/components/Editor/EditorLoader';

const Editor = dynamic(() => import('@/components/Editor/Editor'), {
  ssr: false, 
  loading: () => <EditorLoader />,
});

const EditorClient = () => {
  return (
    <>
      <Editor />
    </>
  );
}

export default EditorClient;