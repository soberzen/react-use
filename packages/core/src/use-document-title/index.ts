import { useIsomorphicEffect } from '../use-isomorphic-effect';

export function useDocumentTitle(title: string) {
  useIsomorphicEffect(() => {
    if (typeof title === 'string' && title.trim().length > 0) {
      const prev = document.title;
      document.title = title.trim();
      return () => {
        document.title = prev;
      };
    }
  }, [title]);
}
