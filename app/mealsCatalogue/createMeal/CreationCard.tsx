import { Paper } from "@mui/material";
import React, { ReactNode } from "react";

interface CreationCardProps {
  children?: ReactNode;
  className?: string;
}

const CreationCard: React.FC<CreationCardProps> = ({ className, children }) => {
  return (
    <Paper className={className} sx={{ borderRadius: "15px" }} elevation={4}>
      <div className="h-[25px] bg-[#70CBFF] rounded-t-[15px]"></div>
      <div className="px-[15px] pt-[30px] pb-[20px]">
        <div className="">{children}</div>
      </div>
    </Paper>
  );
};

export default CreationCard;
