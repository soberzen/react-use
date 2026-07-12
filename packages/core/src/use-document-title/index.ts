import { useIsomorphicEffect } from '../use-isomorphic-effect';

export function useDocumentTitle(title: string) {
  useIsomorphicEffect(() => {
    const trimTitle = title.trim();
    if (typeof title === 'string' && trimTitle.length > 0) {
      const prev = document.title;
      document.title = trimTitle;
      return () => {
        document.title = prev;
      };
    }
  }, [title]);
}
