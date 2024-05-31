"use client";

import React, { useEffect, useState } from "react";
import "github-markdown-css/github-markdown.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ReadmePage = () => {
  const [readmeContent, setReadmeContent] = useState<string>("");

  const pathToReadme = "/README.md";

  useEffect(() => {
    const fetchReadme = async () => {
      const response = await fetch(pathToReadme);
      const text = await response.text();
      setReadmeContent(text);
    };

    fetchReadme();
  }, []);

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeContent}</ReactMarkdown>
    </div>
  );
};

export default ReadmePage;
