"use client";

import React from "react";
import CurrentInfo from "./CurrentInfo";

const MergeAll = () => {
  return (
    <div className="grid grid-rows-4">
      <div>
        <CurrentInfo/>
      </div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  );
};

export default MergeAll;
