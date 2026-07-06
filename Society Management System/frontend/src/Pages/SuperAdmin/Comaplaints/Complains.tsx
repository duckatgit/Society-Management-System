import Card from "../../../componets/Card/Card";
import { cards } from "../../../componets/Card/Data";
import PageHeader from "../../../componets/layout/PageHeader";

import { useGetSocieties } from "../../../Hooks/GetSocieties";
import { useBuilding } from "../../../Hooks/GetBuilding";
import { useGetResident } from "../../../Hooks/getResident";
import { useAnnouncements } from "../../../Hooks/GetAnnouncement";
type ComplainProps = React.ComponentProps<typeof PageHeader>;

export const Complains = (props: ComplainProps) => {
  const { data: societies } = useGetSocieties();
  const { data: buildings } = useBuilding();
  const { data: residents } = useGetResident();
  const { data: announcements } = useAnnouncements();

  return (
    <>
      <PageHeader {...props} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-4 mt-4">
        {cards({
          societies: societies?.count || 0,
          buildings: buildings?.count || 0,
          residents: residents?.count || 0,
          announcements: announcements?.count || 0,
          tickets: 12,
        }).map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-6 mr-6 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr_1fr_1.5fr_1fr] bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-700 uppercase items-center">
          <p>Complaint ID</p>
          <p>Society Name</p>
          <p>Subject</p>
          <p>Category</p>
          <p>Priority</p>
          <p>Status</p>
          <p>Date</p>
        </div>
      </div>
    </>
  );
};
