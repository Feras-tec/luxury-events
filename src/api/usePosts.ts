import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, createPost, deletePost } from "./postsApi";
import type { Post, NewPost } from "./postsApi";

export function usePostsQuery(
  userId: number | "all",
  shouldSimulateError: boolean,
  customStaleTime: number,
) {
  return useQuery<Post[]>({
    queryKey: ["posts", userId, shouldSimulateError],
    queryFn: () =>
      fetchPosts(userId === "all" ? undefined : userId, shouldSimulateError),
    staleTime: customStaleTime,
  });
}

export function useCreatePostMutation(onSuccessCallback: () => void) {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, NewPost>({
    mutationFn: createPost,
    onSuccess: () => {
      onSuccessCallback();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePostMutation(
  userId: number | "all",
  shouldSimulateError: boolean,
) {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    number,
    { previousPosts: Post[] | undefined }
  >({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: ["posts", userId, shouldSimulateError],
      });
      const previousPosts = queryClient.getQueryData<Post[]>([
        "posts",
        userId,
        shouldSimulateError,
      ]);

      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ["posts", userId, shouldSimulateError],
          previousPosts.filter((post) => post.id !== postId),
        );
      }

      return { previousPosts };
    },
    onError: (_err, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          ["posts", userId, shouldSimulateError],
          context.previousPosts,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", userId, shouldSimulateError],
      });
    },
  });
}
