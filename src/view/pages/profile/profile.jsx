import React, { useState, useContext } from "react";
import { View, Text, Image, Button } from "react";
import { Upload, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import userApi from "../../../api/userApi";
import AccountContext from "../../../context/accountContext";
import "./profile.css";

const Profile = () => {
  const { account, setAccount } = useContext(AccountContext);
  const [formData, setFormData] = useState({
    userName: account?.userName || "",
    email: account?.email || "",
    phone: account?.phone || "",
    address: account?.address || "",
    avatar: account?.avatar || null,
    previewAvatar: account?.avatar || null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (file) => {
    setFormData({
      ...formData,
      avatar: file,
      previewAvatar: URL.createObjectURL(file),
    });
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (formData.avatar && formData.avatar !== account.avatar) {
      data.append("avatar", formData.avatar);
    }

    try {
      await userApi.updateUser(account.id, data);
      alert("Profile updated successfully!");
      setAccount({ ...account, ...formData, avatar: formData.previewAvatar }); // Update the account context with new data
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  if (!account) {
    return (
      <div className="container">
        <p className="message">No profile information available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="avatar-container">
        <img src={formData.previewAvatar} alt="Profile Avatar" className="avatar" />
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            handleAvatarChange(file);
            return false;
          }}
        >
          <Tooltip title="Edit Avatar">
            <EditOutlined className="edit-avatar-icon" />
          </Tooltip>
        </Upload>
      </div>
      <h1 className="title">Admin Profile</h1>
      <div className="infoContainer">
        <p className="infoTitle">Username:</p>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          className="infoValue"
        />
      </div>
      <div className="infoContainer">
        <p className="infoTitle">Email:</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="infoValue"
        />
      </div>
      <div className="infoContainer">
        <p className="infoTitle">Phone:</p>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="infoValue"
        />
      </div>
      <div className="infoContainer">
        <p className="infoTitle">Address:</p>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="infoValue"
        />
      </div>
      <button className="saveButton" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Profile;
