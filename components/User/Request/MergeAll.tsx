"use client";

import React from "react";
import CurrentInfo from "./CurrentInfo";
import PersonalInfo from "./PersonalInfo";
import RequestInfo from "./RequestInfo";

const MergeAll = () => {
  return (
    <div className="grid grid-rows-[auto] gap-5">
      <div>
        <CurrentInfo disable={false} />
      </div>
      <div>
        <PersonalInfo disable={false}/>
      </div>
      <div>
        <RequestInfo disable={false}/>
      </div>
    </div>
  );
};

export default MergeAll;
