import { useState } from "react";
import CreateBlogForm from "../../features/blog/components/admin/CreateBlogForm";
import { useProduct } from "../../features/product/hooks/useProduct";
import Loading from "../../shared/components/Loading";
import ProductPreview from "../../features/product/components/admin/ProductPreview";
import EmptyBox from "../../shared/components/EmptyBox";
import { Button } from "antd";
import { useCampaigns } from "../../features/campaign/hooks/useCampaign";
import CampaignPreview from "../../features/campaign/components/admin/CampaignPreview";

type IFeature = "blogs" | "products" | "campaigns";

const AdminScreen = () => {
  const [feature, setFeature] = useState<IFeature | undefined>(undefined);
  const { data: products, isLoading: isProductLoading } = useProduct();
  const { data: campaigns, isLoading: isCampaignLoading } = useCampaigns();
  if (isProductLoading || isCampaignLoading) return <Loading />;

  if (feature === "products") {
    return (
      <div className="adminScreen">
        <div className="-container">
          {products ? (
            products.map((product) => {
              return <ProductPreview key={product.id} product={product} />;
            })
          ) : (
            <EmptyBox>
              <p>Product is empty</p>
            </EmptyBox>
          )}
        </div>
      </div>
    );
  }

  if (feature === "blogs") {
    return <CreateBlogForm />;
  }

  if (feature === "campaigns") {
    return (
      <div className="adminScreen">
        <div className="-container">
          {campaigns ? (
            campaigns.map((campaign) => {
              return <CampaignPreview key={campaign.id} campaign={campaign} />;
            })
          ) : (
            <EmptyBox>
              <p>Campaign is not available for now</p>
            </EmptyBox>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="adminScreen">
      <h2>Select Action</h2>
      <Button onClick={() => setFeature("products")}>Products</Button>
      <Button onClick={() => setFeature("blogs")}>Create Blog</Button>
      <Button onClick={() => setFeature("campaigns")}>Campaigns</Button>
    </div>
  );
};

export default AdminScreen;
