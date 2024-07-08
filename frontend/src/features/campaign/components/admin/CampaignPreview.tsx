import { Button, Card, Tag } from "antd";
import { ICampaign } from "../../campagin.type";
import {
  formatDate,
  getImagePath,
} from "../../../../shared/utils/helper.utils";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { useDeleteCampaign } from "../../hooks/useCampaign";
import toast from "react-hot-toast";

interface IProps {
  campaign: ICampaign;
}
const CampaignPreview = ({ campaign }: IProps) => {
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteCampaign();

  const handleEdit = () => {
    navigate(`/campaign/edit/${campaign.name}`);
  };

  const handleDelete = async () => {
    await mutateAsync(campaign.id);

    toast.success("Campaign has been deleted");
  };

  const generateTitle = (title: string) => {
    return (
      <div className="-title">
        <p>{title}</p>
        <Tag color="purple">
          Total Donation: {campaign.total_donation} / {campaign.donation_goal}
        </Tag>
      </div>
    );
  };
  const generateDescription = (description: string) => {
    if (description.length > 100) {
      description = description.substring(0, 100) + "...";
    }

    return (
      <div className="-desc">
        <p>{description}</p>
        <br />
        <div className="-flex">
          <Tag color="blue">
            Duration: {formatDate(campaign.startDate)} -{" "}
            {formatDate(campaign.endDate)}
          </Tag>
        </div>
        <br />

        <div className="-btn">
          <Button onClick={handleEdit}>Edit</Button>
          <Button type="primary" danger onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      className="-campaign-item"
      cover={<img alt="example" src={getImagePath(campaign.image_url)} />}
    >
      <Meta
        title={generateTitle(campaign.title)}
        description={generateDescription(campaign.content)}
      />
    </Card>
  );
};

export default CampaignPreview;
