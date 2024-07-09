import { useState } from "react";
import CreateBlogForm from "../../features/blog/components/admin/CreateBlogForm";
import { useProduct } from "../../features/product/hooks/useProduct";
import Loading from "../../shared/components/Loading";
import ProductPreview from "../../features/product/components/admin/ProductPreview";
import EmptyBox from "../../shared/components/EmptyBox";
import { Button, FloatButton, Modal } from "antd";
import { useCampaigns } from "../../features/campaign/hooks/useCampaign";
import CampaignPreview from "../../features/campaign/components/admin/CampaignPreview";
import CreateProductForm from "../../features/product/components/admin/CreateProductForm";

import { PlusCircleIcon } from "lucide-react";
import CreateCampaignForm from "../../features/campaign/components/admin/CreateCampaignForm";

export type IFeature = "blogs" | "products" | "campaigns";

const AdminScreen = () => {
  const [feature, setFeature] = useState<IFeature>("products");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: products, isLoading: isProductLoading } = useProduct();
  const { data: campaigns, isLoading: isCampaignLoading } = useCampaigns();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showLoading = () => {
    setIsModalOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const renderContainer = () => {
    if (feature === "products") {
      return (
        <div className="-container">
          {products ? (
            products.map((product) => (
              <ProductPreview key={product.id} product={product} />
            ))
          ) : (
            <EmptyBox>
              <p>Product is empty</p>
            </EmptyBox>
          )}
        </div>
      );
    }

    if (feature === "campaigns") {
      return (
        <div className="-container">
          {campaigns ? (
            campaigns.map((campaign) => (
              <CampaignPreview key={campaign.id} campaign={campaign} />
            ))
          ) : (
            <EmptyBox>
              <p>Campaign is not available for now</p>
            </EmptyBox>
          )}
        </div>
      );
    }

    return (
      // Render blogs data
      // <div className="-container">
      //   {campaigns ? (
      //     campaigns.map((campaign) => (
      //       <CampaignPreview key={campaign.id} campaign={campaign} />
      //     ))
      //   ) : (
      //     <EmptyBox>
      //       <p>Campaign is not available for now</p>
      //     </EmptyBox>
      //   )}
      // </div>
      <EmptyBox />
    );
  };

  const renderModal = () => {
    if (!feature) return null;

    let modalTitle = "";
    let modalContent = null;

    switch (feature) {
      case "blogs":
        modalTitle = "Create Blog";
        modalContent = <CreateBlogForm />;
        break;
      case "products":
        modalTitle = "Create a Product";
        modalContent = <CreateProductForm />;
        break;
      case "campaigns":
        modalTitle = "Create a Campaign";
        modalContent = <CreateCampaignForm />;
        break;
      default:
        break;
    }

    return (
      <Modal
        title={modalTitle}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        {modalContent}
      </Modal>
    );
  };

  if (isProductLoading || isCampaignLoading) return <Loading />;

  return (
    <div className="adminScreen">
      <div className="-header">
        <h2>Select Action</h2>
        <div className="-wrap">
          <Button
            type={feature === "products" ? "primary" : "default"}
            onClick={() => setFeature("products")}
          >
            Products
          </Button>
          <Button
            type={feature === "blogs" ? "primary" : "default"}
            onClick={() => setFeature("blogs")}
          >
            Create Blog
          </Button>
          <Button
            type={feature === "campaigns" ? "primary" : "default"}
            onClick={() => setFeature("campaigns")}
          >
            Campaigns
          </Button>
        </div>
      </div>

      {feature === "products" && (
        <FloatButton
          tooltip={<div>Add new Product</div>}
          onClick={showLoading}
          icon={
            <div className="-icon">
              <PlusCircleIcon size={24} />
            </div>
          }
        />
      )}

      {feature === "campaigns" && (
        <FloatButton
          tooltip={<div>Add new Campaigns</div>}
          onClick={showLoading}
          icon={
            <div className="-icon">
              <PlusCircleIcon size={24} />
            </div>
          }
        />
      )}

      {renderContainer()}
      {renderModal()}
    </div>
  );
};

export default AdminScreen;
