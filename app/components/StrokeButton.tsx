import { Typography } from "@mui/material";

interface StrokeButtonProps {
  className?: string;
  children?: string;
}

export const StrokeButton: React.FC<StrokeButtonProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={
        " border-[#9747FF] rounded border-dashed border py-[12px] bg-[#9747FF]/[.04] flex justify-center items-center cursor-pointer transition-all  hover:bg-[#9747FF]/[.10] hover:shadow-lg hover:transition-all active:bg-[#9747FF]/[.20] " +
        className
      }
    >
      <Typography color={"#9747FF"}>{children} </Typography>
    </div>
  );
};
