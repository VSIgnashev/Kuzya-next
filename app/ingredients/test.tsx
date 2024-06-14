"use client";

import { a1 } from "./page";

type Props = {
  fun?: () => void;
};

const Test: React.FC<Props> = () => {
  return (
    <div className="mt-10">
      currentCount: {a1}
      <div className="flex">
        <div className="">+</div>
        <div className="">-</div>
      </div>
    </div>
  );
};

export default Test;
