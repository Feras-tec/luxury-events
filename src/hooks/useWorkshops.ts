import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workshopService } from "../services/workshopService";
import type { Workshop } from "../types/event";

export const useWorkshops = () => {
  return useQuery<Workshop[], Error>({
    queryKey: ["workshops"],
    queryFn: workshopService.getAllWorkshops,
  });
};

export const useWorkshopDetails = (id: string) => {
  return useQuery<Workshop, Error>({
    queryKey: ["workshop", id],

    queryFn: () => workshopService.getWorkshopById(id),
    enabled: !!id,
  });
};

export const useCreateWorkshop = () => {
  const queryClient = useQueryClient();

  return useMutation<Workshop, Error, Workshop>({
    mutationFn: workshopService.createWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateWorkshop = () => {
  const queryClient = useQueryClient();

  return useMutation<Workshop, Error, Workshop>({
    mutationFn: (updatedData: Workshop) =>
      workshopService.updateWorkshop(updatedData),
    onSuccess: (data: Workshop) => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
      queryClient.invalidateQueries({ queryKey: ["workshop", data.id] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", data.id] });
    },
  });
};

export const useDeleteWorkshop = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => workshopService.deleteWorkshop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
