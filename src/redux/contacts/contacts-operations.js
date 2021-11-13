import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://618db362fe09aa0017440860.mockapi.io";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/contacts").then(({ data }) => data);
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
      return await axios.post("/contacts", contact).then(({ data }) => {
        toast.success(`Contact ${contact.name} successfully added.`);
        return data;
      });
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
      await axios.delete(`/contacts/${delContact.id}`).then(() => {
        toast.success(`Contact ${delContact.name} successfully deleted.`);
      });
    } catch (error) {
      toast.error(`Oops, ${error.message}`);
      return rejectWithValue(error);
    }
  }
);
