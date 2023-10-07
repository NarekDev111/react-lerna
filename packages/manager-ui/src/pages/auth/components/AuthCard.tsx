import { Card, CardHeader } from "@material-tailwind/react";
import { ReactNode } from "react";

export interface IAuthCardProps {
  title: string;
  children: ReactNode;
  width?: number;
  className?: string;
}

export default function AuthCard({ title, children, className }: IAuthCardProps) {
  return (
    <Card
        className={`m-auto ${className}`}
        // style={{ width: `${width || 360}px`, borderRadius: "10px" }}
      >
        <CardHeader className="relative h-16 bg-stockup drop-shadow flex rounded">
          <div className="m-auto text-white font-bold">{title}</div>
        </CardHeader>
        {children}
    </Card>
  );
}
