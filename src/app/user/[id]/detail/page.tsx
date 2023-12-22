"use client";
import { alertFail, alertSuccess } from "@/helper/common";
import { getDetailUsers, updateUser } from "@/redux/features/auth/userSlice";
import { genderItem } from "@/utils/genderItem";
import type { DatePickerProps, FormInstance, RadioChangeEvent } from "antd";
import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import useNotification from "antd/es/notification/useNotification";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function UserDetail(params: { params: { id: string } }) {
  const dispatch = useDispatch();
  const [api, showPopup]: any = useNotification();
  const router = useRouter();

  useEffect(() => {
    dispatch(getDetailUsers(params.params.id));
  }, [dispatch]);
  const { listUserDetail, loading } = useSelector(
    (state: any) => state.userReducer
  );
  const [gender, setGender] = useState();
  const dateFormat = "YYYY-MM-DD";
  const [formRevise]: [FormInstance] = Form.useForm();
  const [dob, setDob] = useState<string>();
  useEffect(() => {
    if (listUserDetail) {
      formRevise.setFieldValue("name", listUserDetail.name);
      setGender(listUserDetail.gender);
      formRevise.setFieldValue("address", listUserDetail.address);
      formRevise.setFieldValue("email", listUserDetail.email);
      setDob(listUserDetail.dob);
    }
  }, [listUserDetail]);
  const onChangeGender = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
  };
  const onFinish = async (values: any) => {
    const userData = {
      name: values.name,
      dob: dob,
      email: values.email,
      address: values.address,
      gender: gender,
    };
    try {
      const res = await dispatch(
        updateUser({ id: params.params.id, data: userData })
      );
      if (res.payload.status === "success") {
        router.push("/home");
        alertSuccess(api, "Update success");
      } else {
        alertFail(api, "Fail");
      }
    } catch (error) {
      alertFail(api, "Fail");
    }
  };
  return (
    <div className="form-user-wrapper">
      <h2 className="title-page">Information Users</h2>
      <ul className="list-info">
        <Form
          name="updateUser"
          form={formRevise}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <li className="info-item">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </li>
          <div className="gender-group">
            <Radio.Group
              options={genderItem}
              value={gender}
              onChange={onChangeGender}
            />
          </div>
          <div className="date-item">
            <Space direction="vertical">
              <DatePicker
                onChange={onChangeDate}
                defaultValue={dayjs(listUserDetail.dob)}
              />
            </Space>
          </div>
          <li className="info-item">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </li>
          <li className="info-item">
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </li>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Update User
            </Button>
          </Form.Item>
        </Form>
      </ul>
    </div>
  );
}
