"use server";
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// This function will handle the server-side request
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Send the data from the request to the backend
      const response = await axios.post('http://backend:8000/dummy/api/get-dummy-data');

      // If the backend request is successful, return the response
      if (response.data.success) {
        return res.status(200).json({ success: true, message: 'Account created successfully!' });
      } else {
        return res.status(400).json({ success: false, message: 'Failed to create account.' });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific error
        console.error("Axios error:", error.response?.data || error.message);
        return res.status(500).json({
          success: false,
          message: error.response?.data?.message || "Something went wrong with the backend request.",
        });
      } else {
        // Handle other types of errors
        console.error("General error:", error);
        return res.status(500).json({
          success: false,
          message: "An unknown error occurred.",
        });
      }
    
    }
  } else {
    // If the request is not a POST, return 405 Method Not Allowed
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
