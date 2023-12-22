"use client";
import { alertFail, alertSuccess } from "@/helper/common";
import { postUser } from "@/redux/features/auth/userSlice";
import { genderItem } from "@/utils/genderItem";
import type { RadioChangeEvent } from "antd";
import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { DatePickerProps } from "antd";
export default function CreateUser() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("MALE");
  const [api, showPopup]: any = useNotification();
  const router = useRouter();
  const date = new Date();
  const [dob, setDob] = useState<any>(date);
  const onFinish = async (values: any) => {
    const userData = {
      name: values.name,
      dob: dob,
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
    } catch (error) {
      alertFail(api, "Fail");
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
  };
  return (
    <div className="form-user-wrapper">
      {showPopup}
      <h2 className="title-page" style={{ marginLeft: "-610px" }}>
        Create Users
      </h2>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <div className="date-item">
          <Space direction="vertical">
            <DatePicker onChange={onChangeDate} />
          </Space>
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
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
