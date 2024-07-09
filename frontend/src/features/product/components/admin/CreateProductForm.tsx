"use client";

import { Form, Input, InputNumber, Upload } from "antd";
import { useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { useCreateProduct } from "../../hooks/useProduct";
import { IAddProduct } from "../../product.type";
import toast from "react-hot-toast";
import Button from "../../../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const { TextArea } = Input;

const CreateProductForm = () => {
  const { mutateAsync } = useCreateProduct();

  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin");
  };

  const handleSubmit = async (data: IAddProduct) => {
    try {
      await mutateAsync(data);
      form.resetFields();

      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Failed to add product");
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
        <h1>Create Product Form</h1>
        <p>Fill the form to add new product for exchanges</p>
        <div className="-image">
          <img
            src={image || "/public/no-image.png"}
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
          label="Enter Product name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="What's the item name" />
        </Form.Item>
        <Form.Item
          label="Enter Item Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the item description" },
          ]}
        >
          <TextArea rows={4} placeholder="Explain this item" />
        </Form.Item>
        <Form.Item
          label="Enter Product quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please enter the quantity" },
            { type: "number", min: 1, message: "Quantity must be at least 1" },
          ]}
        >
          <InputNumber placeholder="Enter item amount" />
        </Form.Item>
        <Form.Item
          label="Enter Product point cost"
          name="point_cost"
          rules={[
            { required: true, message: "Please enter the point cost" },
            { type: "number", min: 1, message: "Point must be at least 1" },
          ]}
        >
          <InputNumber placeholder="Enter product point cost" />
        </Form.Item>
        <Form.Item
          label="Upload product's picture"
          name="image"
          rules={[
            { required: true, message: "Please upload a product picture" },
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
            Add new product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProductForm;
