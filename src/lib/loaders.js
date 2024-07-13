import { defer } from "react-router-dom";
import apiRequest from "./apiRequest.js";

export const singlePageLoader = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Error('Post ID is required');
  }

  try {
    const res = await apiRequest.get(`/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error loading single post data:', error);
    throw error;
  }
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};


export const profilePageLoader = async () => {
  try {
    const postPromise = apiRequest.get("/users/profilePosts");
    const chatPromise = apiRequest.get("/chats");
    return {
      postResponse: await postPromise,
      chatResponse: await chatPromise,
    };
  } catch (error) {
    console.error('Error loading profile page data:', error);
    throw error;
  }
};
