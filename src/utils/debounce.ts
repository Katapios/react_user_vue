import { useEffect, useRef, useCallback } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Обновляем ref callback при изменении
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // Очищаем таймаут при размонтировании
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delay);
        },
        [delay]
    );
}
