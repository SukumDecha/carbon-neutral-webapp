import { useParams } from "react-router-dom";

import Loading from "../../../shared/components/Loading";
import EmptyBox from "../../../shared/components/EmptyBox";
import {
  useCampaignByName,
  useDonate,
  useTopDonors,
} from "../hooks/useCampaign";
import Button from "../../../shared/components/Button";
import { CSSProperties, useState } from "react";
import { IDonor } from "../campagin.type";
import { getImagePath } from "../../../shared/utils/helper.utils";
import toast from "react-hot-toast";
import { useUser } from "../../user/hooks/useUser";
import { Tag } from "antd";

function CampaignDetails() {
  const { name } = useParams();

  const { data: campaign, isLoading } = useCampaignByName(name!);
  const { data: topDonors, isLoading: isLoadingDonor } = useTopDonors(name!);
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { mutateAsync } = useDonate();
  const [amount, setAmount] = useState(0);

  const donors: IDonor[] = topDonors || [];

  const topUser = donors[0];

  console.log(topUser);

  const handleDonate = async () => {
    console.log(amount);
    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (!user) {
      toast.error("Please login to donate");
      return;
    }

    await mutateAsync({
      campaignTitle: campaign!.title,
      amount,
      userId: user.id,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    if (amount < 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (isNaN(amount)) {
      setAmount(0);
      return;
    }

    setAmount(amount);
  };

  const renderMedal = (idx: number) => {
    if (idx === 0) return <img src="/public/gold-medal.png" alt="gold-medal" />;
    if (idx === 1)
      return <img src="/public/silver-medal.png" alt="silver-medal" />;
    if (idx === 2)
      return <img src="/public/bronze-medal.png" alt="bronze-medal" />;

    return <></>;
  };

  if (isLoading || isLoadingDonor || isLoadingUser) return <Loading />;

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
            backgroundImage: `url(${getImagePath(campaign.image_url)})`,
          } as CSSProperties
        }
      >
        <p>{campaign.title}</p>
        <Tag color="green">
          {campaign.total_donations} / {campaign.donation_goal}
        </Tag>
      </div>
      <div className="-contents">
        <p>{campaign.content}</p>
        <form>
          <input
            type="number"
            placeholder="Amount"
            onChange={handleAmountChange}
          />

          <Button onClick={handleDonate}>Donate</Button>
        </form>
      </div>
      <div className="-circle"></div>

      <p className="-leaderboard">LeaderBoard</p>
      <div
        className="-top1"
        style={
          {
            backgroundImage: `url(${getImagePath(campaign.image_url)})`,
            backgroundPosition: "center",
          } as CSSProperties
        }
      >
        <div className="-user-profile">
          <div className="-avatar">
            <img
              src={
                topUser.avatar
                  ? getImagePath(topUser.avatar)
                  : "/public/default-avatar.jpg"
              }
              alt=""
            />
          </div>
          <div className="-name">
            <p>{topUser.username || "None"}</p>
            {renderMedal(0)}
          </div>
          <div className="-amount">
            <Button type="secondary">{topUser.total || 0}</Button>
          </div>
        </div>
      </div>

      {topDonors?.map((user, idx) => (
        <div className="-other" key={idx}>
          <div className="-avatar">
            <img
              src={
                user.avatar
                  ? getImagePath(user.avatar)
                  : "/public/default-avatar.jpg"
              }
              alt={"user-avatar"}
            />
          </div>

          <div className="-name">
            <p>{user.username || "None"}</p>
            {renderMedal(idx + 1)}
          </div>
          <div className="-amount">
            <Button type="secondary">{user.total || 0}</Button>
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
