"use client";

import { FetchOptions } from "@/types/types";
import { millisecondsToHours } from "@/util/functions";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useGlobalData } from "./useGlobalData";

export function useFetch<T>(
  fetchOptions: FetchOptions
): [T | null, boolean, AxiosError | null, () => Promise<T | null>] {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<AxiosError | null>(null);
  const { method, url, headers, body, fetchOnMount, saveAble } = fetchOptions;
  const { notify } = useGlobalData();

  const fetchFunction = async (): Promise<T | null> => {
    setIsFetching(true);
    const options: AxiosRequestConfig<T> = {
      method,
      url,
      headers: headers || {},
    };
    try {
      if (!saveAble) {
        if (method === "POST") {
          // @ts-ignore
          const { data } = await axios.post(url, body, options);
          setData(data);
          return data;
        } else {
          const { data } = await axios.request<T>(options);
          setData(data);
          return data;
        }
      }
      const saved = localStorage.getItem(url);
      if (saved) {
        const parsed = JSON.parse(saved);
        const timeDifference =
          new Date().getTime() - new Date(parsed.savedTime).getTime();
        const diffInHrs = millisecondsToHours(timeDifference);
        if (diffInHrs < 2) {
          setData(parsed.data);
          return parsed.data;
        }
      }
      if (method === "POST") {
        // @ts-ignore
        const { data } = await axios.post(url, body, options);
        setData(data);
        const savedTime = new Date();
        localStorage.setItem(url, JSON.stringify({ savedTime, data }));
        return data;
      } else {
        const { data } = await axios.request<T>(options);
        setData(data);
        const savedTime = new Date();
        localStorage.setItem(url, JSON.stringify({ savedTime, data }));
        return data;
      }
    } catch (error: any) {
      setErrors(error as AxiosError);
      notify(error.response.data.message ?? "An error occurred :(");
      return null;
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount) {
      fetchFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, isFetching, errors, fetchFunction];
}
