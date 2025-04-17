import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import GradientButton from "../../components/common/GradiantButton";
import { message } from "antd";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");

  const aboutDataSave = () => {
    // Simply save the content to the state
    setSavedContent(content);
    message.success("Privacy Policy saved successfully!");
  };

  return (
    <div>
      <div className="mb-6">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
      </div>

      <div className="flex justify-end mb-4">
        <GradientButton
          onClick={aboutDataSave}
          className="w-60 bg-secondary text-white h-10"
        >
          Save Privacy & Policy
        </GradientButton>
      </div>

      <div className="saved-content mt-6">
        <h3 className="mb-5">Preview Privacy Policy</h3>
        <div dangerouslySetInnerHTML={{ __html: savedContent }} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
