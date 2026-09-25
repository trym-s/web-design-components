/** next/navigation for bank previews: the preview page is the only route. */
const router = { push: () => {}, replace: () => {}, back: () => {}, forward: () => {}, refresh: () => {}, prefetch: () => {} };

export const usePathname = () => location.pathname;
export const useRouter = () => router;
export const useSearchParams = () => new URLSearchParams(location.search);
export const useParams = () => ({});
export const redirect = () => {};
export const notFound = () => {};
