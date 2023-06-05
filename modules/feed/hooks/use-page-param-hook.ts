import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const usePageParam = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;

  const current = new URLSearchParams(searchParams);

  const setPage = (page: number) => {
    current.set("page", String(page));
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return { page, setPage };
};
