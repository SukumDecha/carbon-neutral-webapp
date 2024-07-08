import { useParams } from "react-router-dom";

import Loading from "../../../shared/components/Loading";
import EmptyBox from "../../../shared/components/EmptyBox";
import { useCampaignByName, useTopDonors } from "../hooks/useCampaign";
import Button from "../../../shared/components/Button";
import { CSSProperties } from "react";
import { IDonor } from "../campagin.type";
import { getImagePath } from "../../../shared/utils/helper.utils";

function CampaignDetails() {
  const { name } = useParams();
  console.log(name);

  const { data: campaign, isLoading } = useCampaignByName(name!);
  const { data: topDonors, isLoading: isLoadingDonor } = useTopDonors();

  const donors: IDonor[] = topDonors || [];
  const topUser = donors[0];

  if (isLoading || isLoadingDonor) return <Loading />;

  if (!campaign)
    return (
      <EmptyBox>
        <p>Campaign not found</p>
      </EmptyBox>
    );
  return (
    <div className="CampaignScreen">
      <div
        className="-thumbnails"
        style={
          {
            backgroundImage: `url(${campaign.image_url})`,
          } as CSSProperties
        }
      >
        <p>{campaign.title}</p>
      </div>
      <div className="-contents">
        <p>
          {campaign.total_donation} / {campaign.donation_goal}
        </p>
        <p>{campaign.content}</p>
        <form action="">
          <input type="number" name="money" id="money" placeholder="Amount" />
          <Button>Donate</Button>
        </form>
      </div>
      <div className="-circle"></div>

      <p className="-leaderboard">LeaderBoard</p>
      <div className="-top1">
        <div className="-user-profile">
          <img src={getImagePath(topUser.img)} alt="" />
          <p>{topUser.name}</p>
          <div className="-amount">
            <Button type="secondary">{topUser.amount}</Button>
          </div>
        </div>
      </div>

      {topDonors?.map((user, idx) => (
        <div className="-other" key={idx}>
          <img src={getImagePath(user.img)} alt={user.name} />
          <p>{user.name}</p>
          <div className="-amount">
            <Button type="secondary">{user.amount}</Button>
          </div>
        </div>
      ))}

      <div className="-other -hidden">
        <p>s</p>
        <div className="-amount">s</div>
      </div>
    </div>
  );
}

export default CampaignDetails;
