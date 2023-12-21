"use client";
import { alertFail, alertSuccess } from "@/helper/common";
import { postUser } from "@/redux/features/auth/authSlice";
import { genderItem } from "@/utils/genderItem";
import type { RadioChangeEvent } from "antd";
import { Button, Form, Input, Radio } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function HomePage() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("MALE");
  const [api, showPopup]: any = useNotification();
  const router = useRouter();
  const onFinish = async (values: any) => {
    const userData = {
      name: values.address,
      dob: values.dob,
      email: values.email,
      address: values.address,
      gender: gender,
    };
    try {
      const res = await dispatch(postUser(userData));
      if (res.payload.status === "success") {
        router.push("/home");
        alertSuccess(api, "Create user success");
      } else {
        alertFail(api, "Fail");
      }
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  return (
    <div className="form-user-wrapper">
      {showPopup}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dob"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>
        <div className="gender-group">
          <Radio.Group
            options={genderItem}
            value={gender}
            onChange={onChange}
          />
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
