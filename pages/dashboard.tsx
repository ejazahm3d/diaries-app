import React from "react";
import Diaries from "../src/features/diary/Diaries";
import Editor from "../src/features/entry/Editor";

const Dashboard: React.FC = () => {
  return (
    <div className="two-cols">
      <div className="left">
        <Diaries />
      </div>
      <div className="right">
        <Editor />
      </div>
    </div>
  );
};

export default Dashboard;
