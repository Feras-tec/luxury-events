import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workshopService } from "../services/workshopService";
import type { Workshop } from "../types/event";

export const useEvents = () => {
  return useQuery<Workshop[], Error>({
    queryKey: ["events"],
    queryFn: workshopService.getAllWorkshops,
  });
};

export const useEventDetails = (id: string) => {
  return useQuery<Workshop, Error>({
    queryKey: ["event", id],

    queryFn: () => workshopService.getWorkshopById(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<Workshop, Error, Workshop>({
    mutationFn: workshopService.createWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<Workshop, Error, Workshop>({
    mutationFn: (updatedData: Workshop) =>
      workshopService.updateWorkshop(updatedData),
    onSuccess: (data: Workshop) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", data.id] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => workshopService.deleteWorkshop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
