import React from "react";
import { Link } from "react-router-dom";

const AdminCard = ({ title, count, image, onClick }) => {
  return (
    <Link to={onClick}>
      <div className="flex h-36 w-52 flex-row justify-between rounded-xl bg-[#e5e9f7] p-4 text-sm text-black shadow-md">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xl font-semibold">{count}</p>
        </div>
        <div className="flex justify-end">
          <img
            src={image}
            alt={`${title} illustration`}
            className="h-40 w-40 object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default AdminCard;
