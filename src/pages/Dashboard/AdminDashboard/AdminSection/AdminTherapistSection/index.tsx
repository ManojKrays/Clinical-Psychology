import Loader from "@/components/Loader";
import apiDetails from "@/config/apiDetails";
import { authorizedGet } from "@/config/networkWithToken";
import Images from "@/utils/Images";
import { errorNotify } from "@/utils/MessageBar";
import { ArrowBigLeft, MoreHorizontalIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminTherapistSection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [allTherapists, setAllTherapists] = useState([]);

  const fetchTherapistOverview = async () => {
    try {
      setIsloading(true);
      const response = await authorizedGet(
        `${apiDetails.endPoint.getAllTherapistsOverview}`
      );

      if (!response?.status || !response?.data) {
        throw new Error("Failed to fetch Therapist data");
      }
      setAllTherapists(response?.data?.data);
    } catch (error) {
      errorNotify(error?.message);
      console.log("Error fetching Therapist :", error);

      throw new Error(error);
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    fetchTherapistOverview();
  }, []);

  return (
    <div className="mx-auto w-[95%] px-2 pt-20 md:w-[85%] lg:w-[80%]">
      {isLoading ? (
        <div className="flex items-center justify-center p-20">
          <Loader />
        </div>
      ) : (
        <>
          <div
            className="mb-4 flex cursor-pointer items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowBigLeft className="text-xl text-gray-600 hover:text-black" />
            <span className="text-sm font-medium text-gray-700">Back</span>
          </div>
          <div className="bg-grey w-full rounded-[24px] p-4 shadow-sm">
            <div className="flex flex-row justify-between gap-3 md:items-center">
              <h2 className="font-avenir text-lg font-semibold text-gray-700">
                Therapists
              </h2>
              <button className="justify-end text-black">
                <MoreHorizontalIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-2 text-sm font-thin">
                <thead className="bg-grey text-left text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-[12px] font-thin md:text-sm">
                      Therapist Name
                    </th>
                    <th className="px-4 py-3 text-[12px] font-thin md:text-sm">
                      Therapist Joining Date
                    </th>
                    <th className="px-4 py-3 text-[12px] font-thin md:text-sm">
                      Future Sessions
                    </th>
                    <th className="px-4 py-3 text-[12px] font-thin md:text-sm">
                      Completed Sessions
                    </th>
                    <th className="px-4 py-3 text-[12px] font-thin md:text-sm">
                      Status
                    </th>
                    <th className="px-4 py-3 text-[12px] font-thin md:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[12px] font-thin md:text-sm">
                  {allTherapists.map((therapist, idx) => (
                    <tr
                      key={idx}
                      className={`overflow-hidden ${
                        idx % 2 === 0 ? "bg-blue-100" : "bg-white"
                      } shadow`}
                    >
                      <td className="flex items-center gap-2 px-4 py-4">
                        <img
                          src={therapist?.profileUrl || Images.USER}
                          alt="therapist"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="whitespace-nowrap">
                          {therapist?.therapistName}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {therapist?.joinDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {therapist?.futureSessions}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {therapist?.completedSessions}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {(therapist?.accountStatus).toLowerCase()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <button className="text-black hover:underline">
                            Edit
                          </button>
                          <button className="text-black hover:underline">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTherapistSection;
