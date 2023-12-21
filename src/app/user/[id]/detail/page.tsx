"use client";
import { alertFail, alertSuccess } from "@/helper/common";
import { getDetailUsers, postUser } from "@/redux/features/auth/authSlice";
import { genderItem } from "@/utils/genderItem";
import type { RadioChangeEvent } from "antd";
import { Button, Form, Input, Radio } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function HomePage() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("MALE");
  const [api, showPopup]: any = useNotification();
  const router = useRouter();
  useEffect(() => {
    dispatch(getDetailUsers());
  }, [dispatch]);
  const { listUserDetail, loading } = useSelector(
    (state: any) => state.userReducer
  );

  return (
    <div className="form-user-wrapper">
      <ul>
        <h2>Information Users</h2>
        <li>Name:{listUserDetail.name}</li>
        <li>Gender:{listUserDetail.gender}</li>
        <li>Date of birth:{listUserDetail.dob}</li>
        <li>Email:{listUserDetail.email}</li>
        <li>Address:{listUserDetail.address}</li>
      </ul>
    </div>
  );
}
