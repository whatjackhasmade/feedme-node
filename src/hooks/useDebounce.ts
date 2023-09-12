import { useRef, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

export const useDebounce = (callback: () => void, timeout = 1000) => {
	const ref = useRef<any>();

	useEffect(() => {
		ref.current = callback;
	}, [callback]);

	const debouncedCallback = useMemo(() => {
		const func = () => {
			ref.current?.();
		};

		return debounce(func, timeout);
	}, [timeout]);

	return debouncedCallback;
};
