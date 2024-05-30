import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface Participant {
  address: string;
  completed: number;
  total: number;
}

interface SquadTableProps {
  participants: Participant[];
}

const SquadTable: React.FC<SquadTableProps> = ({ participants }) => {
  return (
    <table className="w-full divide-y divide-gray-200 border-y-2 border-black text-black">
      <thead className="bg-gray-50 border-b-2 border-black">
        <tr>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xl font-medium  uppercase tracking-wider "
          >
            Squad Participants:
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xl font-medium  uppercase tracking-wider"
          >
            Completed Challenge
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xl font-medium uppercase tracking-wider"
          >
            Yes / No
          </th>
        </tr>
      </thead>
      <tbody className=" divide-y divide-gray-200 text-black">
        {participants.map((participant, index) => (
          <tr key={index}>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium  border-black border-b-2">
              {participant.address}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm  border-black border-b-2">
              {participant.completed} / {participant.total}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm  border-black border-b-2">
              {participant.completed === participant.total ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SquadTable;
