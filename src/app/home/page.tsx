"use client";
import { alertFail, alertSuccess } from "@/helper/common";
import {
  deleteUser,
  getUsers,
  postUser,
} from "@/redux/features/auth/userSlice";
import { genderItem } from "@/utils/genderItem";
import type { RadioChangeEvent } from "antd";
import { Button, Form, Input, Modal, Pagination, Radio, Table } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadingOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen]: [boolean, React.Dispatch<any>] =
    useState(false);
  const [idUser, setIdUser]: [any, React.Dispatch<any>] = useState();
  const [api, showPopup]: any = useNotification();
  const DEFAULT_PAGE: string = "1";
  const DEFAULT_SIZE: string = "10";
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const { listUser, loading } = useSelector((state: any) => state.userReducer);
  const searchParams = useSearchParams();

  const showModal = (id: any) => {
    setIsModalOpen(true);
    setIdUser(id);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      const res: any = await dispatch(deleteUser(+idUser));
      if (res?.payload?.status === "success") {
        alertSuccess(api, "Delete user success");
        setIsModalOpen(false);
        dispatch(getUsers());
      } else {
        alertFail(api, "Fail");
      }
    } catch (error) {}
  };

  const detailCastFooter = (
    <div className="btn-modal-delete-matching">
      <Button key="back" onClick={handleCancel} className="btn-back">
        Cancel
      </Button>
      <Button
        key="submit"
        type="primary"
        className="btn-delete-matching"
        onClick={handleDeleteUser}
      >
        Delete
      </Button>
    </div>
  );
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record) => (
        <>
          <span className="table-item-name">
            <a href={`/user/${record?.id}/detail`}>{text}</a>
          </span>
        </>
      ),
      sorter: (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        return nameA.localeCompare(nameB);
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        return nameA.localeCompare(nameB);
      },
    },
    {
      title: " ",
      dataIndex: "id",
      key: "delete",
      render: (record: any) => (
        <>
          <div className="item-icon-delete" onClick={() => showModal(record)}>
            <DeleteOutlined />
          </div>
        </>
      ),
    },
  ];
  const tableLoading = (loading: any) => {
    return {
      spinning: loading,
      indicator: (
        <div className="loading-detail">
          <LoadingOutlined className="icon-loading" spin />
        </div>
      ),
    };
  };
  // const handlePagination = async (page: number) => {
  //   setSearchParams({ page: page + "" });
  // };
  return (
    <>
      {showPopup}
      <Modal
        open={isModalOpen}
        className="modal-delete"
        closable={false}
        onCancel={handleCancel}
        closeIcon={<></>}
        footer={detailCastFooter}
      >
        <span>
          <ExclamationCircleOutlined
            style={{ color: "red", fontSize: "20px" }}
          />
        </span>
        <h3 className="title-delete">Are you sure delete user? </h3>
      </Modal>

      <div className="table-wrapper">
        <div className="block-btn">
          <button className="btn btn-create">
            <a href="/user">Create User</a>
          </button>
        </div>
        <Table
          dataSource={listUser}
          columns={columns}
          bordered={true}
          pagination={false}
          loading={tableLoading(loading)}
          rowClassName={(record, _: number): any =>
            record?.key % 2 !== 0 ? "" : "row-color"
          }
          rowKey={"id"}
        />
        <div
          className="pagination-user"
          style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}
        >
          <Pagination
            // onChange={handlePagination}
            pageSize={5}
            total={20}
            current={Number(searchParams.get("page"))}
          />
        </div>
      </div>
    </>
  );
}
