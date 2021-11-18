import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { modalVisible } from "./contacts-actions";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      toast.error(`Oops, ${error.message}.`);
      return rejectWithValue(error);
    }
  }
);

export const addContacts = createAsyncThunk(
  "contacts/addContacts",
  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/contacts", contact);
      toast.success(`Contact ${contact.name} successfully added.`);
      return data;
    } catch (error) {
      toast.error(`Oops, ${error.message}`);
      return rejectWithValue(error);
    }
  }
);

export const delContacts = createAsyncThunk(
  "contacts/delContacts",
  async (delContact, { rejectWithValue }) => {
    try {
      const { request } = await axios.delete(`/contacts/${delContact.id}`);

      if (request.status === 200) {
        toast.success(`Contact ${delContact.name} successfully deleted.`);
        return delContact.id;
      }
    } catch (error) {
      toast.error(`Oops, ${error.message}`);
      return rejectWithValue(error);
    }
  }
);

export const editContacts = createAsyncThunk(
  "contacts/editContacts",
  async (contact, thunkAPI) => {
    try {
      const { id, name, number } = contact;
      const { data } = await axios.patch(`/contacts/${id}`, { name, number });
      toast.success(`Contact ${name} successfully edited.`);
      thunkAPI.dispatch(modalVisible(false));
      return data;
    } catch (error) {
      toast.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
