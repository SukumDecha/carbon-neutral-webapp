"use client";

import { DatePicker, Form, Input, InputNumber, Upload } from "antd";
import { useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import toast from "react-hot-toast";
import Button from "../../../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useCreateCampaign } from "../../hooks/useCampaign";
import { IAddCampaign } from "../../campagin.type";

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const CreateCampaignForm = () => {
  const { mutateAsync } = useCreateCampaign();

  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin");
  };

  const handleSubmit = async (data: IAddCampaign) => {
    const startDate = data.dateRange![0].toISOString();
    const endDate = data.dateRange![1].toISOString();

    data = { ...data, startDate, endDate };
    try {
      await mutateAsync(data);
      form.resetFields();

      toast.success("Campaign has been created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create campaign");
    }
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const file = info.file.originFileObj as RcFile;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (info.file.status === "removed") {
      setImage(undefined);
    }
  };

  return (
    <div className="form" style={{ maxWidth: 820 }}>
      <div className="-description">
        <Button onClick={handleBack}>Go back</Button>
        <h1>Create Campaign Form</h1>
        <p>Fill the form to create new campaign to save our world</p>
        <div className="-image">
          <img
            src={image || "/assets/no-image.png"}
            alt="adding-item"
            width={250}
            height={250}
          />
        </div>
      </div>

      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmit}
        encType="multipart/form-data"
      >
        <Form.Item
          label="Enter Campaign name"
          name="title"
          rules={[
            { required: true, message: "Please enter the campaign name" },
          ]}
        >
          <Input placeholder="What's the campaign name" />
        </Form.Item>
        <Form.Item
          label="Enter Campaign Description"
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter the campaign description",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Explain this campaign" />
        </Form.Item>
        <Form.Item
          label="Enter Campaign donation goal"
          name="donation_goal"
          rules={[
            { required: true, message: "Please enter the amount" },
            { type: "number", min: 1, message: "Amount must be at least 1" },
          ]}
        >
          <InputNumber placeholder="Enter amount" />
        </Form.Item>
        <Form.Item
          label="Start Date and End Date"
          name="dateRange"
          rules={[{ required: true, message: "Please select a date range!" }]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label="Upload campaign's picture"
          name="image"
          rules={[
            { required: true, message: "Please upload a campaign picture" },
          ]}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            onChange={handleImageChange}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <Plus />
              <div style={{ marginTop: 4 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="secondary" htmlType="submit">
            Create campaign
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCampaignForm;
