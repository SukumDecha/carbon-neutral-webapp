import {
  ArrowBigDown,
  ArrowBigUp,
  DollarSign,
  Fish,
  HandCoins,
  PiggyBank,
  TreePine,
  Utensils,
} from "lucide-react";
import { useDonationHistory } from "../features/user/hooks/useUser";
import Loading from "../shared/components/Loading";
import EmptyBox from "../shared/components/EmptyBox";

const getIcon = (campaign: string) => {
  if (campaign.startsWith("tree")) return <TreePine />;
  if (campaign.startsWith("coral")) return <Fish />;
  if (campaign === "food") return <Utensils />;
  return <DollarSign />;
};

const getUnit = (campaign: string) => {
  if (campaign.startsWith("tree") || campaign.startsWith("coral"))
    return "Planted";
  if (campaign === "food") return "Researched";
  return "Donated";
};

export const StatisticScreen = () => {
  const { data: statistic, isLoading } = useDonationHistory();

  if (isLoading) return <Loading />;

  if (!statistic) return <EmptyBox />;

  const totalDonated = statistic.reduce(
    (acc, item) => acc + Number(item.total),
    0
  );

  const renderStatistic = statistic.map((item) => {
    return (
      <div className="-donation-flex">
        <p>
          {item.title} {getUnit(item.title)}
        </p>
        <div className="-flex">
          {item.total}
          {getIcon(item.title)}
        </div>
      </div>
    );
  });

  return (
    <div className="StatisticScreen">
      <div className="Donation">
        <div className="-flex">
          <h1>Donation</h1>
          <HandCoins />
        </div>
        <div className="Line"></div>
        <div className="DonationInformation">
          {renderStatistic}
          <div className="Line"></div>
          <div className="-donation-flex">
            <p>Total</p>
            <div className="-flex">
              <p>{totalDonated}</p>
              <PiggyBank />
            </div>
          </div>
        </div>
      </div>

      <div className="Karma">
        <div className="-flex">
          <h1>Karma</h1>
        </div>
        <div className="Line"></div>

        <div className="GoodKarma">
          <p>Good Karma</p>
          <div className="-flex">
            <p>99,999 </p>
            <ArrowBigUp />
          </div>
        </div>
        <div className="BadKarma">
          <p>Bad Karma</p>
          <div className="-flex">
            <p>99,999 </p>
            <ArrowBigDown />
          </div>
        </div>
        <div className="Line"></div>
        <div className="-donation-flex">
          <p>Total Karma</p>
          <p>20,000</p>
        </div>
      </div>
    </div>
  );
};
