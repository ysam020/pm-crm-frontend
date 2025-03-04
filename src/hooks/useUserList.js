import { useState, useEffect } from "react";
import apiClient from "../config/axiosConfig";
import protobuf from "protobufjs";

function useUserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const root = await protobuf.load("/user.proto");
        const GetUsersResponse = root.lookupType(
          "userpackage.GetUsersResponse"
        );

        // Make request
        const response = await apiClient.get("/get-all-users", {
          headers: {
            Accept: "application/x-protobuf",
          },
          responseType: "arraybuffer",
        });

        // Decode response
        const message = GetUsersResponse.decode(new Uint8Array(response.data));

        // Convert to object
        const data = GetUsersResponse.toObject(message, {
          arrays: true,
          defaults: true,
        });
        setUserList(data.username.map((user) => user));
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }

    getUsers();
  }, []);
  return userList;
}

export default useUserList;
