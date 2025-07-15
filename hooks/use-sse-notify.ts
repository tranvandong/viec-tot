import { useEffect, useState } from "react";
import { useApi, useList, useCount, useUpdate } from "./useDataProvider";
import { Notify } from "@/providers/types/definition";
import { serverSideApiUrl } from "@/providers/dataProvider";
import { useAuth } from "@/providers/contexts/AuthProvider";
import { keepPreviousData } from "@tanstack/react-query";
import { set } from "date-fns";

export function useSSENotifies() {
  const apiUrl = useApi();
  const { authorized } = useAuth();
  // const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: fetchedNotifies,
    refetch,
    isLoading,
    setPage,
    isPlaceholderData,
    pagination: { current: currentPage },
  } = useList<Notify>({
    resource: "Notifies",
    pagination: {
      current: 1,
      pageSize: pageSize,
    },
    sorters: [{ field: "createdDate", order: "desc" }],
    meta: {
      config: { auth: "auth", subSystem: "default" },
    },
    queryOptions: {
      enabled: authorized,
      placeholderData: keepPreviousData,
    },
  });

  const { data: unreadCount, refetch: refetchUnreadCount } = useCount({
    resource: "Notifies",
    filters: [{ field: "isNew", operator: "eq", value: true }],
    meta: {
      config: { auth: "auth", subSystem: "default" },
    },
    queryOptions: {
      enabled: authorized,
    },
  });

  const { mutate: updateNotify } = useUpdate<Notify>({
    resource: "Notifies",
    meta: { config: { auth: "auth", subSystem: "default" } },
  });

  const [notifies, setNotifies] = useState<Notify[]>([]);

  useEffect(() => {
    if (fetchedNotifies?.data) {
      setNotifies((prevNotifies) => {
        if (currentPage === 1) {
          return fetchedNotifies.data;
        } else {
          // Filter out duplicates before appending
          const newNotifies = fetchedNotifies.data.filter(
            (newNotify) =>
              !prevNotifies.some((prevNotify) => prevNotify.id === newNotify.id)
          );
          return [...prevNotifies, ...newNotifies];
        }
      });
    }
  }, [fetchedNotifies, currentPage]);

  // useEffect(() => {
  //   console.log(isPlaceholderData, fetchedNotifies);

  //   setNotifies(fetchedNotifies?.data || []);
  // }, [fetchedNotifies]);

  useEffect(() => {
    if (!authorized) {
      return;
    }

    const url = `${apiUrl}/default/allow/Notification/Sse/sse`;
    const eventSource = new EventSource(url);
    eventSource.addEventListener("ping", (event) => {
      console.log(
        "🚀 ~ file: notification.tsx:33 ~ source.addEventListener ~ event:PINGGGGGGG",
        event
      );
    });

    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data) as Notify;
        setNotifies((prevNotifies) => [newNotification, ...prevNotifies]);
        if (newNotification.isNew) {
          refetchUnreadCount();
        }
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };
    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [apiUrl, authorized, refetchUnreadCount]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const markAsRead = (id: string) => {
    updateNotify(
      {
        id: id,
        variables: { isNew: false },
      },
      {
        onSuccess: () => {
          setNotifies((prevNotifies) =>
            prevNotifies.map((notify) =>
              notify.id === id ? { ...notify, isNew: false } : notify
            )
          );
          refetchUnreadCount();
        },
      }
    );
  };

  return { notifies, loadMore, isLoading, unreadCount, markAsRead };
}
