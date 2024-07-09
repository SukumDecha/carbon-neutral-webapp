import {
  ArrowBigDown,
  ArrowBigUp,
  ChevronDown,
  Fish,
  HandCoins,
  History,
  PiggyBank,
  TreePine,
  Utensils,
} from "lucide-react";

export const StatisticScreen = () => {
  return (
    <div className="StatisticScreen">
      <div className="Donation">
        <div className="-flex">
          <h1>Donation</h1>
          <HandCoins />
        </div>
        <div className="Line"></div>
        <div className="DonationInformation">
          <div className="-donation-flex">
            <p>Trees Planted</p>
            <div className="-flex">
              <p>99,999 </p>
              <TreePine />
            </div>
          </div>
          <div className="-donation-flex">
            <p>Corals Planted </p>
            <div className="-flex">
              <p>4,250 </p>
              <Fish />
            </div>
          </div>
          <div className="-donation-flex">
            <p>Food Researched </p>
            <div className="-flex">
              <p>100</p>
              <Utensils />
            </div>
          </div>
          <div className="Line"></div>
          <div className="-donation-flex">
            <p>Total</p>
            <div className="-flex">
              <p>104,393</p>
              <PiggyBank />
            </div>
          </div>
        </div>
      </div>

      <div className="PointsHistory">
        <div className="-flex">
          <div className="-flex">
            <h1>Points History</h1>
            <History />
          </div>
        </div>

        <div className="Line"></div>
        <div className="PointsHistoryInformation">
          <div className="FirstHistory">
            <p>Redeem a shirt</p>
            <p>-100 Points</p>
          </div>
          <div className="SecondHistory">
            <p>Redeem a plushie</p>
            <p>-100 Points</p>
          </div>
          <div className="ThirdHistory">
            <p>Won an ideation event</p>
            <p>+300 Points</p>
          </div>
          <div className="Line"></div>

          <div className="--flex">
            <ChevronDown />
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
