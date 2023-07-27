import { AxiosError } from "axios";
import React from "react";
import { handleLogin } from "./Navbar";

export const ErrorHandler = ({ error }: { error: AxiosError }) => {
  const errorMessageData: any = error.response?.data as unknown as any;

  return (
    <div>
      <p>
        {errorMessageData.message ??
          "An error occurred fetching your playlists"}
      </p>
      <p>{error.response?.status}</p>
      <p>{error.response?.statusText}</p>
    </div>
  );
};
