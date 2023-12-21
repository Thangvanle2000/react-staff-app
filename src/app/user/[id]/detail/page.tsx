"use client";
import { alertFail, alertSuccess } from "@/helper/common";
import { getDetailUsers, postUser } from "@/redux/features/auth/authSlice";
import { genderItem } from "@/utils/genderItem";
import type { RadioChangeEvent } from "antd";
import { Button, Form, Input, Radio } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function UserDetail(params: { params: { id: string } }) {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("MALE");
  const [api, showPopup]: any = useNotification();
  const router = useRouter();

  useEffect(() => {
    dispatch(getDetailUsers(params.params.id));
  }, [dispatch]);

  const { listUserDetail, loading } = useSelector(
    (state: any) => state.userReducer
  );

  return (
    <div className="form-user-wrapper">
      <h2 className="title-page">Information Users</h2>
      <ul className="list-info">
        <li className="info-item">Name: {listUserDetail.name}</li>
        <li className="info-item">Gender: {listUserDetail.gender}</li>
        <li className="info-item"> Date of birth: {listUserDetail.dob}</li>
        <li className="info-item">Email: {listUserDetail.email}</li>
        <li className="info-item">Address: {listUserDetail.address}</li>
      </ul>
    </div>
  );
}
