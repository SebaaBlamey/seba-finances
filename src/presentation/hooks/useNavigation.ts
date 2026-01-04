import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  return {
    navigateTo: (path: string) => router.push(path),
    navigateBack: () => router.back(),
    replace: (path: string) => router.replace(path),
  };
};
