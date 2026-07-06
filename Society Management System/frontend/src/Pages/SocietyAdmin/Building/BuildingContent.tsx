// import Card from "../../../componets/Card/Card";
// import { buildingCards } from "../../../componets/Card/SocietyData";
import PageHeader from "../../../componets/layout/PageHeader";

type BuildingsProps = React.ComponentProps<typeof PageHeader>;

export const BuildingContent = (props: BuildingsProps) => {
  return (
    <>
      <PageHeader {...props} />

      {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 mt-6">
        {building(data).map((card) => (
          <Card {...card} />
        ))}
      </div>*/}

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 mt-5 p-4 overflow-hidden mr-6 flex flex-col justify-between">
        <div className="hidden md:grid rounded grid-cols-[2.5fr_1.2fr_1.2fr_1.2fr_1fr_1fr] px-6 py-4 text-xs font-semibold text-black bg-gray-100 uppercase tracking-wide border-b border-gray-200">
          <p>BUILDING /TOWER</p>
          <p>FLOORS</p>
          <p>TOTAL FLATS</p>
          <p>STATUS</p>
          <p>OCCUPANCY</p>
          <p className="text-right pr-4">ACTIONS</p>
        </div>
      </div>
    </>
  );
};
