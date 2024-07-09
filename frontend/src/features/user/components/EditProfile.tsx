"use client";

import { Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Loading from "../../../shared/components/Loading";
import Button from "../../../shared/components/Button";
import { getImagePath } from "../../../shared/utils/helper.utils";
import { useEditUser, useUser } from "../hooks/useUser";
import EmptyBox from "../../../shared/components/EmptyBox";
import { IUpdateUser } from "../user.type";

const EditProfile = () => {
  const { data: user, isLoading } = useUser();
  const { mutateAsync } = useEditUser();
  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>(undefined);

  const initialValues = user
    ? {
        ...user,
        avatar: undefined,
      }
    : {
        username: "",
        email: "",
        password: "",
        avatar: undefined,
      };

  const handleSubmit = async (data: IUpdateUser) => {
    console.log("submtted data:", data);
    try {
      await mutateAsync(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
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

  useEffect(() => {
    if (user && user.avatar) {
      setImage(user.avatar);
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <EmptyBox />;
  }
  return (
    <div className="EditProfileScreen">
      <div className="Profile">
        <div className="ProfilePicture">
          <img
            src={image ? getImagePath(image) : "/public/default-avatar.jpg"}
            alt="Profile"
          />
        </div>
      </div>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input />
        </Form.Item>
        <Form.Item label="Upload avatar's picture" name="avatar">
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
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
